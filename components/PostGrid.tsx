import React, { ReactNode } from 'react'
interface PostGridProps {
  children: ReactNode
}
function PostGrid({ children }: PostGridProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
      {children}
    </div>
  )
}

export default PostGrid
