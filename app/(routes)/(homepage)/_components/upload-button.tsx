import { UploadCloud } from 'lucide-react';

const UploadButton = () => {
    return ( 
        <div className="flex justify-center mt-5">
        <button className="bg-green-600 py-2 px-6 border-2 border-purple-700/50 rounded-full flex gap-2">
        <UploadCloud />
        <span>
          Choose a file
        </span>
        </button>
      </div>
     );
}
 
export default UploadButton;