import { podcastData } from '@/constants'
import React from 'react'
import Podcastcard from '../components/Podcastcard'

const Home = () => {
  return (
    <div className='mt-9 flex- flex-col gap-9'>
      <section className='flex flex-col gap-5'>
       <h1 className='text-20 font-bold text-white-1 '>Trending podcast</h1>
       {podcastData.map(({id, title, description, imgURL})=>(
             <Podcastcard
                 key={id}
                 title={title}
                 description={description}
                 imgURL={imgURL}
                 podcastId = {id}
             />
       ))}
      </section>
    </div>
  )
}

export default Home