"use client";
import { podcastData } from '@/constants'
import React from 'react'
import Podcastcard from '../components/Podcastcard'

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface task {
_id : string,
text : string
}

   

const Home:React.FC = () => {
  const tasks = useQuery<Task[]>(api.tasks.get);

  return (
    <div className='mt-9 flex- flex-col gap-9'>
      <section className='flex flex-col gap-5'>
       <h1 className='text-20 font-bold text-white-1 '>Trending podcast</h1>
       <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </div>
         <div className='podcast_grid'>
         {podcastData.map(({id, title, description, imgURL, placeholder})=>(
             <Podcastcard
                 key={id}
                 title={title}
                 description={description}
                 imgURL={imgURL}
                 podcastId = {id}
                 placeholder ={placeholder}
             />
       ))}
    
         </div>
      </section>
    </div>
  )
}

export default Home