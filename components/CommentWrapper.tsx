import React, { ReactNode } from 'react'

function CommentWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-blue-500 shadow space-y-2'>
      <h3 className='text-4xl'>Comments</h3>
      <hr />
      {children}
    </div>
  )
}

export default CommentWrapper
