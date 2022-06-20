import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'
interface PostCardProps {
  _id: string
  slug: string
  mainImage: any
  title: string
  name: string
  description: string
  image: string
}
function PostCard({
  _id,
  slug,
  mainImage,
  title,
  name,
  description,
  image,
}: PostCardProps) {
  return (
    <>
      <Link href={slug}>
        <div className='group cursor-pointer border rounded-lg overflow-hidden'>
          <img
            className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
            src={urlFor(mainImage).url()!}
            alt=''
          />
          <div className='flex justify-between p-5 bg-white'>
            <div>
              <p className='text-lg font-bold'>{title}</p>
              <p className='text-xs'>
                {description} by {name}
              </p>
            </div>
            <img
              className='h-12 w-12 rounded-full'
              src={urlFor(image).url()!}
              alt=''
            />
          </div>
        </div>
      </Link>
    </>
  )
}

export default PostCard
