import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
interface Inputs {
  _id: string
  name: string
  email: string
  comment: string
}
interface CommentFormProps {
  _id: string
}
function CommentForm({ _id }: CommentFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const handleSendData: SubmitHandler<Inputs> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => {
        setSubmitted(false)
      })
    reset()
  }
  console.log(errors)
  return (
    <div>
      {submitted ? (
        <div className='flex flex-col py-10 my-10 px-5 bg-blue-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
          onSubmit={handleSubmit(handleSendData)}>
          <h3 className='text-lg font-medium text-pink-600'>
            Enjoyed this article?
          </h3>
          <h4 className='text-3xl font-bold mt-5 text-blue-500'>
            Leave a comment below!
          </h4>
          <hr className='py-3 mt-2' />
          <input type='hidden' {...register('_id')} value={_id} />
          <label className='block mb-5'>
            <span className='text-gray-700'>Name</span>
            <input
              className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 focus:ring outline-none'
              type='text'
              placeholder='Name'
              {...register('name', {
                required: true,
                validate: (value) => {
                  return !!value.trim()
                },
              })}
            />
          </label>
          <label className='block mb-5'>
            <span className='text-gray-700'>Email</span>
            <input
              className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 focus:ring outline-none'
              type='text'
              placeholder='Name'
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                validate: (value) => {
                  return !!value.trim()
                },
              })}
            />
          </label>
          <label className='block mb-5'>
            <span className='text-gray-700'>Comment</span>
            <textarea
              className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring ring-blue-500'
              rows={8}
              placeholder='Name'
              {...register('comment', {
                required: true,
                validate: (value) => {
                  return !!value.trim()
                },
              })}
            />
          </label>
          {/* Handle errors */}
          <div className='flex flex-col p-5'>
            {errors.name?.type === 'required' && (
              <span className='text-red-500'>Name is required</span>
            )}
            {errors.email?.type === 'required' && (
              <span className='text-red-500'>Email is required</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className='text-red-500'>
                The email is not a valid email address.
              </span>
            )}
            {errors.comment?.type === 'required' && (
              <span className='text-red-500'>Comment is required</span>
            )}
          </div>
          <input
            type='submit'
            className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
          />
        </form>
      )}
    </div>
  )
}

export default CommentForm
