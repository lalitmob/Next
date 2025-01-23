import Leftsidebar from "../components/Leftsidebar";
import Image from "next/image";
import Mobilenav from "../components/Mobilenav";
import Rightsidebar from "../components/Rightsidebar";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
    <main className="relative flex bg-black-3">
      <Leftsidebar/>
      <section className="flex flex-col min-h-screen flex-1 px-4 sm:px-14">
        <div className="mx-auto flex w-full flex-col max-w-5xl max-sm:px-4">
          <div className="flex h-16 items-center justify-between md:hidden">
             <Image src="/icons/logo.svg" alt="menu/icon" width={30} height={30}/>
              <Mobilenav/>
          </div>
          <div className="flex flex-col md:pb-14 text-white-1">
            <Toaster/>
            {children}
          </div>
        </div>

      </section>
        <Rightsidebar/>
    </main>
    </div>
  );
}
