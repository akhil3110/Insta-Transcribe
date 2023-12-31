import { Rocket, Video } from 'lucide-react';

const VideoSection = () => {
    return ( 
        <div className='flex mt-12 justify-center  md:gap-14'>
            <div className="hidden sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
              <video src="/homepage_demo_video.mp4"  muted autoPlay loop></video>
            </div>
          <div className='hidden sm:block my-auto  mx-2 md:mx-0'>
            <Rocket />
          </div>
          <div className="bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
            <video src="/transcribed_demo_video.mp4"  muted autoPlay loop></video>
          </div>
      </div>
     );
}
 
export default VideoSection;