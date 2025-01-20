import React from 'react'
import Image from 'next/image'
const Podcastcard = ({podcastId, title, description, imgURL}:{
    podcastId : Number,
      title : String,
      description : String,
      imgURL : String
} )=> {
  return (
    <div>
        <figure>
            <Image src={imgURL} alt='card-image' width={40} height={144}></Image>
        </figure>
    </div>
  )
}

export default Podcastcard