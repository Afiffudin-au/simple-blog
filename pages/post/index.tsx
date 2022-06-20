import Head from 'next/head'
import React from 'react'
import Header from '../../components/Header'
import PostCard from '../../components/PostCard'
import PostGrid from '../../components/PostGrid'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'
function Posts({ posts }: { posts: [Post] }) {
  return (
    <div>
      <Head>
        <title>Simpe Blog - is place to write, read, and connect</title>
        <meta
          name='description'
          content={`There's a place to write, read, and connect on just about anything.`}
        />
        {/* for media social meta */}
        <meta
          property='og:title'
          content='Simpe Blog - is place to write, read, and connect'
        />
        <meta
          property='og:description'
          content={`There's a place to write, read, and connect on just about anything.`}
        />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/dblvavqbv/image/upload/v1655734659/portfolio-images/Screenshot_23_geg6v6.png'
        />
        <meta
          property='og:url'
          content='https://simple-blog.tosulafiffudin.com/'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:site_name'
          content='Simpe Blog - is place to write, read, and connect'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <PostGrid>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            slug={`/post/${post.slug.current}`}
            _id={post._id}
            mainImage={post.mainImage}
            title={post.title}
            description={post.description}
            image={post.author.image}
            name={post.author.name}
          />
        ))}
      </PostGrid>
    </div>
  )
}

export default Posts
export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author ->{
    name,
    image
  },
  description,
  mainImage,
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
