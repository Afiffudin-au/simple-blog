import React from 'react'
import Header from '../../components/Header'
import PostCard from '../../components/PostCard'
import PostGrid from '../../components/PostGrid'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'
function Posts({ posts }: { posts: [Post] }) {
  return (
    <div>
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
