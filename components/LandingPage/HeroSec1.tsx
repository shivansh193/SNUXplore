import Image from 'next/image';
import Navbar from "@/components/Navbar";

const WelcomeSection = () => {
  return (
    <div className="relative min-h-screen w-screen bg-black text-yellow-400 flex flex-col justify-center px-0 sm:px-8">
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
        <h1 className="text-4xl sm:text-6xl font-nohemi-extrabold mb-4 ml-4 sm:ml-0">
          Welcome to<br/>
          <span className="text-6xl sm:text-9xl mb-4 pb-4" >SNUxplore</span>
        </h1>
        <div className="flex items-center justify-between space-y-4 mt-0 sm:space-y-0 ml-4 sm:ml-0 mr-4 sm:mr-0 sm:space-x-4 mb-8">
          <div className="text-left sm:text-left">
            <span className="text-xl sm:text-4xl font-nohemi-bold text-snuxplore-orange">9.5k</span>
            <span className="text-xs sm:text-sm block text-snuxplore-orange font-nohemi-semibold">users already <br/> use snuxplore</span>
          </div>
          <div className="flex justify-center">
            <AvatarButton />
          </div>
          <div className="text-center sm:text-right">
            <span className="text-4xl sm:text-6xl font-nohemi-extrabold">V4.0</span>
          </div>
        </div>
        <p className="text-base text-sm sm:text-lg mb-8 sm:mx-0 mx-4 max-w-2xl">
            {"We get it, life is hard. Navigating through the 286 acre campus shouldn't be. "}
            {"Unlock everything SNU has to offer. All just a search away!"}
        </p>
      </div>
      <div className={'w-full h-fit flex flex-col justify-center items-center'}>
          {/* <Navbar /> */}
      </div>
    </div>
  )
}

const AvatarButton = () => {

    const avatars = [
        '/avatar1.png',
        '/avatar2.png',
        '/avatar3.png',
        '/avatar4.png'
    ];

    return (
        <div className="flex items-center bg-snuxplore-dark-orange bg-opacity-50 px-3 py-2 rounded-full">
            {avatars.map((src, index) => (
                <div key={index} className="w-6 h-6 sm:w-10 sm:h-10 rounded-full -mr-2 overflow-hidden border-2 border-white">
                    <Image src={src} alt={`Avatar ${index + 1}`} width={40} height={40}/>
                </div>
            ))}
            <button className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 ml-4 sm:ml-10 rounded-full bg-gray-800 text-white">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#181818"/>
                    <path
                        d="M6 15C5.44772 15 5 15.4477 5 16C5 16.5523 5.44772 17 6 17L6 15ZM26.7071 16.7071C27.0976 16.3166 27.0976 15.6834 26.7071 15.2929L20.3431 8.92893C19.9526 8.53841 19.3195 8.53841 18.9289 8.92893C18.5384 9.31946 18.5384 9.95262 18.9289 10.3431L24.5858 16L18.9289 21.6569C18.5384 22.0474 18.5384 22.6805 18.9289 23.0711C19.3195 23.4616 19.9526 23.4616 20.3431 23.0711L26.7071 16.7071ZM6 17L26 17L26 15L6 15L6 17Z"
                        fill="#F6F6F6" fill-opacity="0.6"/>
                </svg>
            </button>
        </div>
)
}


export default WelcomeSection;
