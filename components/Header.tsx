import Link from 'next/link'

function Header() {
  return (
    <header className='flex justify-between p-5 max-w-7xl mx-auto bg-white'>
      <div className='flex items-center space-x-5'>
        <Link href='/'>
          <a className='text-2xl text-gray-800 font-bold font-serif cursor-pointer'>
            T.Afiffudin💕
          </a>
        </Link>
        <div className='hidden md:inline-flex items-center space-x-5'>
          <h3 className='text-gray-800 font-normal text-base'>About</h3>
          <h3 className='text-gray-800 font-normal text-base'>Contact</h3>
          <Link href='/post'>
            <a className='text-white font-bold bg-blue-500 px-4 py-1 rounded-full'>
              My Post
            </a>
          </Link>
        </div>
      </div>
      <div className='flex items-center space-x-5 text-blue-600'>
        <h3>Sign In</h3>
        <h3 className='border px-4 py-1 rounded-full border-blue-600'>
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
