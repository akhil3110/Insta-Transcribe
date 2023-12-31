// @ts-nocheck
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile,toBlobURL } from '@ffmpeg/util';
import { useEffect, useRef, useState } from "react";
import { ToSrt } from "@/lib/to-srt.js";
// @ts-ignore
import roboto from '@/app/(video-transcribe-page)/[filename]/_fonts/Roboto-Regular.ttf';
// @ts-ignore
import robotoBold from '@/app/(video-transcribe-page)/[filename]/_fonts/Roboto-Bold.ttf'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ResultColumnProps {
    filename: string;
    transcriptionItems: {
        start_time: string;
        end_time: string;
        content: string;
        }[];
}

const ResultColumn = ({
    filename,
    transcriptionItems
}: ResultColumnProps) => {
  const videoUrl = "https://insta-transcribe.s3.eu-north-1.amazonaws.com/"+filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [progress, setProgress] = useState(1);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const router = useRouter();


    useEffect(() => {
      videoRef.current.src = videoUrl;
      load();
    }, []);
  
    const load = async () => {
      const ffmpeg = ffmpegRef.current;
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
      await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
      setLoaded(true);
    }
  
    function toFFmpegColor(rgb) {
      const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
      return '&H' + bgr + '&';
    }
  
    const transcode = async () => {
      router.refresh();
      const ffmpeg = ffmpegRef.current;
      const srt = ToSrt(transcriptionItems);
      await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
      await ffmpeg.writeFile('subs.srt', srt);
      videoRef.current.src = videoUrl;
      await new Promise((resolve, reject) => {
        videoRef.current.onloadedmetadata = resolve;
      });
      const duration = videoRef.current.duration;
      ffmpeg.on('log', ({ message }) => {
        const regexResult = /time=([0-9:.]+)/.exec(message);
        if (regexResult && regexResult?.[1]) {
          const howMuchIsDone = regexResult?.[1];
          const [hours,minutes,seconds] = howMuchIsDone.split(':');
          const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
          const videoProgress = doneTotalSeconds / duration;
          setProgress(videoProgress);
        }
      });
      await ffmpeg.exec([
        '-i', filename,
        '-preset', 'ultrafast',
        '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=50,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
        'output.mp4'
      ]);
      const data = await ffmpeg.readFile('output.mp4');
      videoRef.current.src =
        URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        setProgress(1);

    }

    return (
      <>
        <div className="mb-4">
          <Button
            onClick={transcode}
            className="bg-red-600 hover:bg-red-900 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer">
            <Rocket />
            <span>Apply captions</span>
          </Button>
        </div>
        <div>
          <div className="flex">
            <div>
              Primary color:
            </div>
            <div>
              <input type="color"
                value={primaryColor}
                onChange={ev => setPrimaryColor(ev.target.value)}
                className=" bg-transparent"
              />
            </div>
          </div>
          <div className="flex">
            <div>
              Outline color:
            </div>
            <div>
              <input type="color"
                value={outlineColor}
                onChange={ev => setOutlineColor(ev.target.value)}
                className=" bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden relative">
          {progress && progress < 1 && (
            <div className="absolute inset-0 bg-black/80 flex items-center w-[340px] h-[580px]">
              <div className="w-full text-center">
                <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                  <div className="bg-bg-gradient-from h-8"
                       style={{width:progress * 100+'%'}}>
                    <h3 className="text-white text-xl absolute mx-auto inset-0 py-1">
                      {parseInt(progress * 100)}%
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <video
            className="w-[340px] h-[580px]"
            data-video={0}
            ref={videoRef}
            controls>
          </video>
        </div>
      </>
    );
  }
 
export default ResultColumn;