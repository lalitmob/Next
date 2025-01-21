import React from 'react'
import Image from 'next/image'
const Podcastcard = ({podcastId, title, description, imgURL, placeholder}:{
    podcastId : number,
      title : string,
      description : string,
      imgURL : string,
      placeholder : string
} )=> {
  return (
    <div className='cursor-pointer'>
        <figure className='flex flex-col gap-2'>
            <Image src={placeholder} alt='card-image' width={174} height={174} className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'/>
        </figure>
        <div>
            <h1 className='text-16 text-white-1 truncate font-bold'>{title}</h1>
            <h2 className='text-12 truncate font-normal capitalize'>{description}</h2>
        </div>
    </div>
  )
}

export default Podcastcard