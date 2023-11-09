import PageHeaders from "@/components/page-headers";
import { Button } from "@/components/ui/button";
import { format } from "@/lib/format";
import { ArrowRight } from "lucide-react";

const Pricing = () => {
    return ( 
        <div>
           <PageHeaders 
                h1Text={"Check out our pricing "}
                h2Text={"Our pricing is simple and straightforward. No surprises!"}
           />
           <div className="bg-white text-slate-600 rounded-lg max-w-sm mx-auto p-4 text-center mt-10">
                <h3 className=" font-bold text-3xl"> Free</h3>
                <p>You can Transcribe 2 videos for free</p>
           </div>
           <div className="bg-white text-slate-600 rounded-lg max-w-sm mx-auto p-4 text-center mt-10">
                <h3 className=" font-bold text-3xl">Premium Package</h3>
                <p>TransScribe Unlimited Number of videos For Free</p>
                <p className="text-black"> 
                    At just: {format(2000)}
                </p>
                <Button className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg mt-4 font-medium">
                    Buy Now
                    <ArrowRight />
                </Button>
           </div>
        </div>
     );
}
 
export default Pricing;