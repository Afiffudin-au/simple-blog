import React from 'react'
interface CommentItemProps {
  _id: string
  comment: string
  name: string
}
function CommentItem({ _id, comment, name }: CommentItemProps) {
  return (
    <div key={_id}>
      <p>
        <span className='text-blue-500 mr-2'>{name}:</span>
        {comment}
      </p>
    </div>
  )
}

export default CommentItem
