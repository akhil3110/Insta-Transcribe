import axios from 'axios';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TypeAnimation } from 'react-type-animation';


const UploadForm = () => {

    const [isUploading, setIsUploading] = useState(false);

    const upload = async(e: any) => {

        try {
            e.preventDefault();
            const files = e.target?.files;
            
            setIsUploading(true);
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
        } finally {
            setIsUploading(false);
        }
    }

    return ( 
        <>
            {isUploading && (
                <div className=' bg-black/90 text-white fixed  inset-0  flex items-center'>
                    <div className='w-full text-center'>    
                        <h2 className='text-4xl mb-4'>
                            Uploading
                        </h2>
                        <h3 className='text-xl'>
                            <TypeAnimation
                                preRenderFirstString={true}
                                sequence={[
                                    200,
                                    'please wait ', 
                                    200,
                                    'please wait .', // initially rendered starting point
                                    200,
                                    'please wait ..',
                                    200,
                                    'please wait ...',
                                    200,
                                    'please wait ..',
                                    200,
                                    'please wait .',
                                    200,
                                    'please wait ',
                                    200,
                                ]}
                                speed={75   }
                                repeat={Infinity}
                            />
                        </h3>
                    </div>
                </div>
            )}

            <label className="bg-green-600 py-2 px-6 border-2 border-purple-700/50 rounded-full flex gap-2 cursor-pointer">
            <UploadCloud />
            <span>
                Choose a file
            </span>
            <input  type="file" onChange={upload} className='hidden'/>
            </label>
        </>
     );
}
 
export default UploadForm;