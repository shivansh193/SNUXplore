import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <Image
        src="/DiningHall.svg"
        alt="Food Hall Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl font-bold text-yellow-500 mb-6">
          Welcome to FOODxplore
        </h1>
        
        {/* Subheading */}
        <p className="text-lg sm:text-2xl text-white mb-12 max-w-2xl">
          We get it, life is hard. Finding the best food on campus shouldn't be.
          Check out the best restaurants and food stalls SNU has to offer. All
          just a search away.
        </p>

   

        {/* Scroll Down Button */}
        <div className="absolute bottom-10 flex justify-center items-center">
          <button className="bg-yellow-500 text-black p-4 rounded-full animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
