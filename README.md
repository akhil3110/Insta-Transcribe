# insta-transcribe
A website where you can upload vertical format video (Shorts or Reels) and add subtitles to it.

## About the Project:
* Developed a Next.js application enabling users to seamlessly upload vertical videos (Instagram Reels or YouTube Shorts) to an    AWS S3 bucket, integrating AWS Transcribe for automatic transcription.
* Implemented a robust AWS S3 storage solution to efficiently store both the original videos and their corresponding Transcribe-generated transcription files, facilitating easy retrieval and management.
* Utilized ffmpeg wasm to dynamically add captions derived from the transcription files to the original videos, enhancing accessibility and user engagement.
* Enabled users to edit captions and timestamps directly within the application, providing a user-friendly interface for customization and improving overall user experience.
* Incorporated advanced features allowing users to customize caption text color, offering a personalized touch to the videos and enhancing visual appeal.



# Working of Project
![insta-transcribe-workflow](https://github.com/akhil3110/Insta-Transcribe/assets/78949515/5040ace8-7eca-410b-85a0-5131326707bc)



* User Can upload a video file.
* This video will be uploaded to AWS S3 bucket and return the link of video.
* Link of this video will be provided to AWS Transcribe service and the .transcribe file will be uploaded to same bucket.
* Now this data of this file will be read and converted to SRT format.
* User can also edit and design the time stamps and subtitles if we want.
* With use of FFMPEG WASM we will add this SRT format subtitles in to video.
* Now user can download the video with subtitles.

## Getting Started

Install all dependencies required for the project:
```bash
npm i
```

Now set up .env file 
```bash
cp .env.sample .env
```

Add all you the requires keys in .env file 


Now project set up is completed now you can run the project
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Technologies Used
A list of technologies used within the project:
* Next.js
* Shacdcn (Frontend Component Library)
* Tailwind CSS
* AWS S3 SDK
* AWS Transcribe SDK
* FFMPEG WASM
