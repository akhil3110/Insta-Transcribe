import axios from 'axios';
import { UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';


const UploadForm = () => {

    const upload = async(e: any) => {

        try {
            e.preventDefault();
            const files = e.target?.files;

            if(files.length !=0){
                const file = files[0];
                const res = await axios.postForm('/api/upload',{
                    file,
                })
            }
            
            toast.success("File Uploaded Successfully");
        } catch (error : any) {
           console.log("UPLOAD FORM",error.message);
           toast.error("Something went wrong"); 
        }
    }

    return ( 
        <label className="bg-green-600 py-2 px-6 border-2 border-purple-700/50 rounded-full flex gap-2 cursor-pointer">
        <UploadCloud />
        <span>
          Choose a file
        </span>
        <input type="file" onChange={upload} className='hidden'/>
        </label>
     );
}
 
export default UploadForm;