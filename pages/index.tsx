import Head from 'next/head'
import Header from '../components/Header'
import PostCard from '../components/PostCard'
import PostGrid from '../components/PostGrid'
import { sanityClient } from '../sanity'
import { Post } from '../typings'
interface Props {
  posts: [Post]
}
const Home = ({ posts }: Props) => {
  return (
    <div className='max-w-7xl mx-auto'>
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
      <div className='flex justify-between items-center bg-blue-300 border-y border-blue-400 rounded py-5 px-5 lg:py-16 lg:px-10'>
        <div className='px-10 space-y-5'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>...</span>{' '}
            is place to write, read, and connect hhh
          </h1>
          <h2>
            There's a place to write, read, and connect on just about anything.
          </h2>
        </div>

        <div>
          <img
            className='hidden md:inline-flex h-32 lg:h-full'
            src='https://www.freepnglogos.com/uploads/a-letter-logo-png-4.png'
            alt=''
          />
        </div>
      </div>
      {/* Posts */}
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
export default Home
