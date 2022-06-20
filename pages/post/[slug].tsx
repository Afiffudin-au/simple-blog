import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
interface Props {
  post: Post
}

import time from '../../utils/time'
import CommentForm from '../../components/CommentForm'
import CommentItem from '../../components/CommentItem'
import CommentWrapper from '../../components/CommentWrapper'
import Head from 'next/head'
function Post({ post }: Props) {
  console.log(post)
  return (
    <main>
      <Head>
        <title>Simpe Blog - is place to write, read, and connect</title>
        <meta name='description' content={post.description} />
        {/* for media social meta */}
        <meta property='og:title' content={post.title} />
        <meta property='og:description' content={post.description} />
        <meta property='og:image' content={urlFor(post.author.image).url()} />
        <meta
          property='og:url'
          content={`https://simple-blog.tosulafiffudin.com/post/${post.slug.current}`}
        />
        <meta property='og:type' content='article' />
        <meta property='og:site_name' content={post.title} />
      </Head>
      <Header />
      <img
        className='w-3/4 mx-auto h-96 object-cover rounded shadow shadow-blue-100'
        src={urlFor(post.mainImage).url()}
        alt=''
      />
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          {post.description}
        </h2>
        <div className='flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={urlFor(post.author.image).url()}
            alt=''
          />
          <div className='font-extralight text-sm'>
            Blog post by
            <span className='text-green-600'>{post.author.name}</span> -
            Published at {time(post._createdAt)}
          </div>
        </div>
        <div className='mt-10'>
          <PortableText
            content={post.body}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            serializers={{
              h1: (props: any) => (
                <h1 className='text-2xl font-bold my-5' {...props} />
              ),
              h2: (props: any) => (
                <h1 className='text-2xl font-bold my-5' {...props} />
              ),
              li: ({ children }: any) => (
                <li className='ml-4 list-disc'>{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className='text-blue-500 hover:underline'>
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className='max-w-lg my-5 mx-auto border border-pink-500' />
      <CommentForm _id={post._id} />
      {/* Comment */}
      <CommentWrapper>
        {post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment.comment}
            name={comment.name}
            _id={comment._id}
          />
        ))}
      </CommentWrapper>
    </main>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug{
      current
    }
  }`
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author ->{
    name,
    image
  },
  'comments': *[
    _type == "comment" && 
   post._ref == ^._id &&
   approved == true
  ],
  description,
  mainImage,
  slug,
  body
  }`
  const post = await sanityClient.fetch(query, { slug: params.slug })
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 60, //after 60 seconds, itll update the old cache version
  }
}
export default Post
