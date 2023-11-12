"use client";

import axios from 'axios';
import {useEffect,useState} from 'react'
import TranscriptionItem from './_components/transcription-item';
import { Button } from '@/components/ui/button';
import { Rocket, RocketIcon } from 'lucide-react';

const FilePage = (
    {params}: {params: {filename: string}}
) => {

    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcription, setTranscription] = useState([]);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);

    useEffect(() => {
        getTranscription();
    }, [params.filename])
    
    function getTranscription() {
        setIsFetchingInfo(true);
        axios.get('/api/transcribe?filename='+params.filename).then(
            res => {
                setIsFetchingInfo(false);
                const status = res.data?.status;
                const transcription = res.data?.transcription;

                if(status == "IN_PROGRESS"){
                    setIsTranscribing(true);
                    setTimeout(getTranscription,3000)
                }else{
                    setIsTranscribing(false);
                    const transcriptionItems = []
                    transcription.results.items.forEach((item: any,key: any) => {
                        if(!item.start_time){
                            const prev = transcription.results.items[key-1]; 
                            prev.alternatives[0].content +=   item.alternatives[0].content
                            delete transcription.results.items[key]
                        }
                    })


                    setTranscription(
                        transcription.results.items.map((item:any) =>{
                            const {start_time,end_time} = item;
                            const content = item.alternatives[0].content;
                            return {start_time,end_time,content}
                        })
                    )
                }
            }
        )
    }

    if(isTranscribing){
        return (
            <div className=' bg-black/90 text-white fixed  inset-0  flex items-center'>
                <div className='w-full text-center'>
                    Transcribing Video...
                </div>
            </div>
        )
    }

    if(isFetchingInfo){
        return (
            <div className=' bg-black/90 text-white fixed  inset-0  flex items-center'>
                <div className='w-full text-center'>
                    Fetching info...
                </div>
            </div>
        )
    }
    

    return ( 
        <div>
            <div className='grid grid-cols-2 gap-16'>
                <div>
                    <h2 className=' text-4xl font-semibold text-white/80 mb-5'> 
                        Transcription:
                    </h2>
                    <div className='grid grid-cols-3 text-center sticky top-0 '>
                        <div className='p-1 mr-1 rounded-md border-b border-white/50  bg-violet-500'>
                            Start
                        </div>
                        <div className='p-1 mx-1 rounded-md border-b border-white/50  bg-violet-500'>
                            End
                        </div>
                        <div className='p-1 ml-1 rounded-md border-b border-white/50  bg-violet-500'>
                            Content
                        </div>
                    </div>
                    {transcription.length > 0 && (
                        transcription.map((item: any) =>(
                            <TranscriptionItem 
                                item={item}
                                key={item.start_time}
                            />
                        ))
                    )}
                </div>
                <div>
                    <div className='sticky top-0'>
                        <h2 className=' text-4xl font-semibold text-white/80 mb-3'> 
                            Result:
                        </h2>
                        <div className='mb-3'>
                            <Button  className='bg-red-800 hover:bg-red-600'>
                                <Rocket size={24} className='mr-2'/>
                                    Put Captions
                                <RocketIcon size={24} className='ml-2'/>
                            </Button>
                        </div>
                        <div>
                            <video 
                                src={"https://insta-transcribe.s3.eu-north-1.amazonaws.com/"+params.filename} 
                                controls 
                                className='h-[620px] rounded-xl overflow-hidden'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FilePage;