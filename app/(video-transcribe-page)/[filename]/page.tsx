"use client";

import axios from 'axios';
import {useEffect,useState} from 'react'
import TranscriptionItem from './_components/transcription-item';
import { Button } from '@/components/ui/button';
import { Rocket, RocketIcon } from 'lucide-react';
import ResultColumn from './_components/result-column';
import { isFilePresent } from '@/lib/isFilePresent';
import { redirect, useRouter } from 'next/navigation';


const FilePage = (
    {params}: {params: {filename: string}}
) => {

    // const isPresent = isFilePresent(params.filename);
    // const router = useRouter();

    // if(!isPresent){
    //     console.log(isPresent, "adadada")
    //     router.push('/');
    // }

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
            <div className=' bg-black/70 text-white fixed  inset-0  flex items-center'>
                <div className='w-full text-center'>
                    Transcribing Video...
                </div>
            </div>
        )
    }

    if(isFetchingInfo){
        return (
            <div className=' bg-black/70 text-white fixed  inset-0  flex items-center'>
                <div className='w-full text-center'>
                    Fetching info...
                </div>
            </div>
        )
    }

    const updateTranscription = (index: any, property: any, ev: any) => {
        const newTranscription = [...transcription];
        // @ts-ignore
        newTranscription[index][property] = ev.target.value;
        setTranscription(newTranscription)
    }
    

    return ( 
        <div>
            <div className='grid md:grid-cols-2 gap-8 md:gap-16'>
                <div >
                    <h2 className=' text-4xl font-semibold text-white/80 mb-5'> 
                        Transcription:
                    </h2>
                    <div className='grid grid-cols-3 text-center sticky top-0'>
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
                    <div className='h-72 overflow-auto md:h-auto scroll-bar-width'>
                        {transcription.length > 0 && (
                            transcription.map((item: any, key) =>(
                                <>
                                    <TranscriptionItem 
                                        item={item}
                                        handleStartTimesChange={(ev) =>updateTranscription(key,'start_time',ev)}
                                        handleEndTimesChange={(ev) =>updateTranscription(key,'end_time',ev)}
                                        handleContentChange={(ev) =>updateTranscription(key,'content',ev)}
                                    />
                                </>
                            ))
                        )}
                    </div>
                </div>
                <div>
                    <h2 className=' text-4xl font-semibold text-white/80 mb-3'> 
                        Result:
                    </h2>
                    <div className='sticky top-7'>
                        <ResultColumn
                            filename={params.filename}
                            transcriptionItems = {transcription}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FilePage;