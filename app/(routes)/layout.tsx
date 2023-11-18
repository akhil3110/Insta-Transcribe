import Banner from "@/components/banner";
import Navbar from "../../components/Navbar";

const HomePageLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <>
            <Banner
                label="If you want to test this project you can download a demo video from here" 
            />
            <div className="h-full p-4 bg-gradient-to-t from-red-600 to-purple-800 min-h-screen text-white">
                <div className="max-w-6xl mx-auto">
                    <Navbar />
                    <main className="h-full mt-14">
                        {children}
                    </main>
                </div>
            </div>
        </>
     );
}
 
export default HomePageLayout;