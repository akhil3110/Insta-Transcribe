interface TranscriptionItemProps{
    item: {
        start_time: string;
        end_time: string;
        content: string;
        };
    handleStartTimesChange: (ev: any) => void;
    handleEndTimesChange: (ev: any) => void;
    handleContentChange: (ev: any) => void;
}

const TranscriptionItem = ({
    item,
    handleStartTimesChange,
    handleEndTimesChange,
    handleContentChange
}: TranscriptionItemProps ) => {

    if(!item){
        return '';
    }


    return ( 
        <div className="my-1 grid grid-cols-3 gap-1 items-center">
            <input 
                type="text" 
                className="bg-white/20 p-1 rounded-md border-b border-white/50 text-black"
                value={item.start_time} 
                onChange={handleStartTimesChange} 
            />
           <input 
                type="text" 
                className="bg-white/20 p-1 rounded-md border-b border-white/50 text-black"
                value={item.end_time} 
                onChange={handleEndTimesChange} 
            />
            <input
                type="text"
                className="bg-white/20 p-1 rounded-md border-b border-white/50 text-black"
                value={item.content} 
                onChange={handleContentChange}
            />
        </div>
     );
}
 
export default TranscriptionItem;