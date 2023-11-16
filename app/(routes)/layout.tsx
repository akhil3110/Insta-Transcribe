import Navbar from "./_components/Navbar";

const HomePageLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full p-4 bg-gradient-to-t from-red-600 to-purple-800 min-h-screen text-white">
            <div className="max-w-6xl mx-auto">
                <Navbar />
                <main className="h-full mt-14">
                    {children}
                </main>
            </div>
        </div>
     );
}
 
export default HomePageLayout;