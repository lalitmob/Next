import React from 'react'
import { FC } from 'react'
import { Interface } from 'readline'
interface podcastDetailsProps{
  params : {
    podcastId : string
  }
}
 const podcastDetails :FC<podcastDetailsProps>=({params})=>{
  const {podcastId} = params
   return (
      <p>Details :-{podcastId}</p>
   )
 }

export default podcastDetails