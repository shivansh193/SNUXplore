const Navigation = () => {
    const navItems = [
      { text: "NAVIGATION", color: "yellow" },
      { text: "FOODXPLORE", color: "yellow", isNew: true },
      { text: "HEALTH-KIT", color: "yellow" },
      { text: "ADMIN INFO", color: "yellow" },
      { text: "SNU-GPT", color: "yellow" }
    ];
  
    return (
      <nav className="bg-gray-900 bg-opacity-80 h-screen w-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/path-to-your-background-image.jpg')"}}>
        <ul className="space-y-6 text-center">
          {navItems.map((item, index) => (
            <li key={index} className="relative">
              {item.isNew && (
                <span className="absolute -top-6 -right-1 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
              <div 
                className={`text-${item.color}-400 text-6xl font-bold 
                            transition duration-300 ease-in-out 
                            ${item.color === 'orange' 
                              ? 'hover:text-orange-300'
                              : 'hover:text-white'} 
                            hover:scale-110 hover:cursor-pointer
                            hover:shadow-lg ${item.color === 'orange' 
                              ? 'hover:shadow-orange-300/50'
                              : 'hover:shadow-yellow-300/50'}`}
              >
                {item.text}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Navigation;