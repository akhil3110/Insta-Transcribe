// @ts-nocheck


import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile,toBlobURL } from '@ffmpeg/util';
import { use, useEffect, useRef, useState } from "react";
import { transcode } from "buffer";
import { ToSrt } from "@/lib/to-srt.js";
// @ts-ignore
import roboto from '@/app/(routes)/(video-transcribe-page)/[filename]/_fonts/Roboto-Regular.ttf';
// @ts-ignore
import robotoBold from '@/app/(routes)/(video-transcribe-page)/[filename]/_fonts/Roboto-Bold.ttf'




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
    const videoURL = "https://insta-transcribe.s3.eu-north-1.amazonaws.com/"+filename;
    const [loaded, setLoaded] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
    const [outlineColor, setOutlineColor] = useState('#000000');
    const [progress, setProgress]: any = useState(1);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);


    useEffect(() => {
        //@ts-ignore
        videoRef.current.src = videoURL;
        load();
      }, []);

      const load = async () => {
        const ffmpeg = ffmpegRef.current;
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
        setLoaded(true);
      }
    
    
      function toFFmpegColor(rgb: any) {
        const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
        return '&H' + bgr + '&';
      }

      const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        const srt = ToSrt(transcriptionItems);
        await ffmpeg.writeFile(filename, await fetchFile(videoURL));
        await ffmpeg.writeFile('subs.srt', srt);
        //@ts-ignore
        videoRef.current.src = videoURL;
        await new Promise((resolve, reject) => {
            //@ts-ignore
            videoRef.current!.onloadedmetadata = resolve;
        });
        //@ts-ignore
        const duration = videoRef.current!.duration;
        ffmpeg.on('log', ({ message }) => {
          const regexResult = /time=([0-9:.]+)/.exec(message);
          if (regexResult && regexResult?.[1]) {
            const howMuchIsDone = regexResult?.[1];
            //@ts-ignore
            const [hours,minutes,seconds] = howMuchIsDone.split(':');
            //@ts-ignore
            const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
            //@ts-ignore
            const videoProgress = doneTotalSeconds / duration;
            setProgress(videoProgress);
          }
        });
        await ffmpeg.exec([
          '-i', filename,
          '-preset', 'ultrafast',
          '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
          'output.mp4'
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        //@ts-ignore
        videoRef.current.src =URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        setProgress(1);
      }
    
    return ( 
        <>
            <h2 className=' text-4xl font-semibold text-white/80 mb-3'> 
                Result:
            </h2>
            <div className='mb-3'>
                <Button  
                    className='bg-red-800 hover:bg-red-600'
                    onClick={transcode}
                >
                    <Rocket size={24} className='mr-2'/>
                            Put Captions
                    <Rocket size={24} className='ml-2'/>
                </Button>
            </div>
            <div>
                primary color:
                <input type="color"
                    className="ml-2 bg-transparent"
                    value={primaryColor}
                    onChange={ev => setPrimaryColor(ev.target.value)}/>
                <br />
                outline color:
                <input type="color"
                    className="ml-2 bg-transparent"
                    value={outlineColor}
                    onChange={ev => setOutlineColor(ev.target.value)}/>
            </div>
            <div className="rounded-xl overflow-hidden relative">
        {progress && progress < 1 && (
          <div className="absolute inset-0 bg-black/80 flex items-center">
            <div className="w-full text-center">
              <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                <div className="bg-bg-gradient-from h-8"
                     style={{width:progress * 100+'%'}}>
                  <h3 className="text-white text-xl absolute inset-0 py-1">
                    {parseInt(progress * 100)}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )} 
                <video 
                    ref={videoRef}
                    controls 
                    data-video = {"https://insta-transcribe.s3.eu-north-1.amazonaws.com/"+filename} 
                    className='h-[620px] rounded-xl overflow-hidden'
                />
           
            </div>
        </>
     );
}
 
export default ResultColumn;