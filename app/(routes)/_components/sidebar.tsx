import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface SideBarrProps {
    data: {
        title: string;
        href: string;
    }[]
}

const SideBar = ({
    data
}: SideBarrProps) => {
    return ( 
        <div className=" mt-5">
            {data.map((item) =>(
                <div key={item.href} className="flex flex-col w-full my-5 ">
                    <Link href={item.href} className="text-white font-normal" >{item.title}</Link>
                    <Separator/>
                </div>
            ))}
        </div>
     );
}
 
export default SideBar;