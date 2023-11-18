import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Sidebar } from "lucide-react";
import SideBarr from "../app/(routes)/_components/sidebar";
import SideBar from "../app/(routes)/_components/sidebar";

const sheetContent = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Contact",
    href: "mailto:akhil1659@gmail.com",
  }
]


const Navbar = () => {
    return (
        <div className="sticky top-2">
          <header className="flex justify-between my-4">
          <Link href="/" className=" font-extrabold sm:text-lg md:text-xl flex gap-x-2">
            <Image src="/logo.svg" width="30" height="30" alt="logo"/>
             Insta Transcribe
          </Link>
          <div className="hidden lg:block">
            <nav className="gap-10 text-white/80 flex">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <a href="mailto:akhil1659@gmail.com" className="hover:text-white">Contact</a>
            </nav>
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-t from-red-600 to-purple-800">
                <SheetHeader>
                  <SheetTitle className="text-white font-semibold">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                  <SheetClose asChild>
                    <SideBar
                      data={sheetContent}
                    />
                  </SheetClose>
              </SheetContent>
          </Sheet>
          </div>
        </header>
        </div>
    );
}
 
export default Navbar;