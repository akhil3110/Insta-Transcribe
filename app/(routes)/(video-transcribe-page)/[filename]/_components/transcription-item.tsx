import { useState } from "react";

interface TranscriptionItemProps{
    item: {
        start_time: string;
        end_time: string;
        content: string;
        }
}

const TranscriptionItem = ({
   item
}: TranscriptionItemProps ) => {

    const [startSeconds,setStartSeconds] = useState(item.start_time);
    const [endSeconds,setEndSeconds] = useState(item.end_time);
    const [content,setContent] = useState(item.content);

    return ( 
        <div className="my-1 grid grid-cols-3 gap-1 items-center">
            <input 
                type="text" 
                className="bg-white/20 p-1 rounded-md border-b border-white/50 text-black"
                value={startSeconds} 
                onChange={e => setStartSeconds(e.target.value)} 
            />
            <input
                type="text"
                className="bg-white/20 p-1 rounded-md border-b border-white/50 text-black"
                value={endSeconds} 
                onChange={e => setEndSeconds(e.target.value)}
            />
            <input
                type="text"
                className="bg-white/20 p-1 rounded-md border-b border-white/50 text-black"
                value={content} 
                onChange={e => setContent(e.target.value)}
            />
        </div>
     );
}
 
export default TranscriptionItem;