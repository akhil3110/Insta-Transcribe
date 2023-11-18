import { AlertTriangle, CheckCircle, Download, Rocket } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex item-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: " bg-emerald-700 border-emerald-800 text-secondary",
            }
        },
        defaultVariants:{
            variant: "warning",
        }
    },
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const iconMap = {
    warning: Rocket,
    success: CheckCircle,
}

const Banner = ({
    label,
    variant
}: BannerProps) => {

    const Icon = iconMap[variant || "warning"];

    return ( 
        <div className={cn(bannerVariants({variant}))}>
            {label}
            <span>
                <a 
                    href="/demo_video.mp4"
                    download="demo_video.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Download className="h-5 w-5 ml-2 text-sky-400 hover:text-sky-600 cursor-pointer"/>
                </a>
            </span>
        </div>
     );
}
 
export default Banner;