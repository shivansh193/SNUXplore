import Link from "next/link";

const Navigation = () => {
    const navItems = [
        { text: "NAVIGATION", href:'/navigation', color: "yellow", enabled: true },
        { text: "FOODXPLORE", href:'/food', color: "yellow", isNew: true, enabled: false },
        { text: "HEALTH-KIT", href:'/health', color: "yellow", enabled: false },
        { text: "ADMIN INFO", href:'/admin', color: "yellow", enabled: false },
        { text: "SNU-GPT", href: '/gpt', color: "yellow", enabled: true }
    ];

    return (
        <nav className="relative bg-snuxplore-black h-screen w-screen flex items-center justify-center bg-cover bg-center -mt-20" style={{ backgroundImage: "url('/linkbg.svg')" }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <ul className="relative space-y-4 sm:space-y-6 text-center px-4">
                {navItems.map((item, index) => (
                    <li key={index} className="relative">
                        {item.isNew && (
                            <span className="absolute -top-4 -right-1 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                NEW
                            </span>
                        )}
                        <Link
                            href={item.href}
                            className={`text-4xl sm:text-6xl md:text-8xl text-snuxplore-yellow hover:text-snuxplore-orange font-nohemi-extrabold 
                                transition duration-300 ease-in-out 
                                hover:scale-110 hover:cursor-pointer
                                hover:shadow-lg`}
                        >
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
