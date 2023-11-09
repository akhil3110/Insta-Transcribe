import PageHeaders from '@/components/page-headers';
import VideoSection from './_components/video-section';
import UploadButton from './_components/upload-button';


export default function Home() {
  return (
    <>
      <PageHeaders
        h1Text='Add Captios to your videos'
        h2Text='Just Upload the video and we will do the rest'
      />
      <UploadButton />
      <VideoSection />
    </>
  )
}
