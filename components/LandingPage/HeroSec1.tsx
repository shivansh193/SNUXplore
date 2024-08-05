import Image from 'next/image';

const WelcomeSection = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-yellow-400 flex flex-col justify-center px-4 sm:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-image.png"
          alt="Campus background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-30"
          priority={true}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Welcome to<br/>
          <span className="text-5xl sm:text-8xl mb-4 pb-4" >SNUxplore</span>
        </h1>
        <div className="flex items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-bold">9.5k</span>
            <span className="text-sm sm:text-lg block">Students using our app</span>
          </div>
          <div className="flex justify-center">
            <AvatarButton />
          </div>
          <div className="text-center sm:text-right">
            <span className="text-xl sm:text-2xl font-bold">V4.0</span>
          </div>
        </div>
        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            {"We get it, life is hard. Navigating through the 286 acre campus shouldn't be."}
            {"Unlock everything SNU has to offer. All just a search away!"}
        </p>
        <nav className="flex justify-around bg-gray-800 p-4 rounded-full border border-gray-600 items-center">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-colors">Home</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors">Navigate</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors">SNU-GPT</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors">FOODexplore</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors">About</button>
        </nav>
      </div>
    </div>
  )
}

const AvatarButton = () => {
    return (
      <a href="#" className="flex items-center bg-[#582b0c] rounded-full p-2 sm:p-2 space-x-2 no-underline hover:bg-[#6d3610] transition-colors">
        <div className="relative w-32 h-10 sm:w-40 sm:h-12">
          <Image
            src="/avatars.png"
            alt="User avatars"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 text-white rounded-full flex items-center justify-center">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 13.414V7h-2v8.414l-3.707-3.707-1.414 1.414L12 18.828l6.121-6.121-1.414-1.414L13 15.414z" />
          </svg>
        </div>
      </a>
    )
  }





export default WelcomeSection;
