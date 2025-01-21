'use client'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import clsx from 'clsx'
const Leftsidebar = () => {
   const pathname = usePathname()
   const router = useRouter()
  return (
     <section className='left-sidebar'>
        <nav className='flex flex-col bg-black-2 gap-6 p-3 h-full '>
            <Link href="/" className='flex cursor-pointer items-center'>
            <Image src="/icons/logo.svg" alt='logo' width={23} height={27}/>
             <h1 className='text-white-1 text-24  font-extrabold max-lg:hidden'>Podcastr</h1>
            </Link>
             {
               sidebarLinks.map(({route, label, imgURL})=>{
                  const isActive = pathname===route || pathname.startsWith(`${route}/`)
                   return <Link href={route} key={label} className={
                     clsx('flex text-white-1 gap-3 py-4 px-4 items-center max-lg:px-4 justify-center lg:justify-start', {
                        "bg-nav-focus border-r-4 border-orange-500" : isActive
                     })
                       
                    }>
                     <Image src={imgURL} alt='img' width={24} height={24}/>
                     <span>{label}</span>
                    </Link>
               }

               )
             }
        </nav>
     </section>
  )
}
export default Leftsidebar