import React from "react";
import Image from "next/image";
import appLogo from "../../public/snulogo.svg"; // Make sure to update the path to your logo
import NavbarDropdown from "/public/navbardropdown.svg"; // Make sure to update the path to your dropdown image
import Link from "next/link";

function Navbar() {
    return (
        <div className="fixed bottom-8 z-50 flex gap-1 w-fit sm:w-fit sm:gap-2 bg-snuxplore-nav-light-gray p-1.5 shadow-lg rounded-lg mx-auto sm:mx-2">
            <div className="flex flex-shrink-0 gap-2 bg-snuxplore-nav-dark-gray sm:p-6 p-2 rounded-lg">
                <Link href="/" className="flex items-center w-full h-full">
                    {/* <Image src={appLogo} alt="App Logo" width={55} height={55} /> */}
                    <Image src={NavbarDropdown} alt="Dropdown" width={55} height={55} />
                </Link>
            </div>
            <div className="flex items-center bg-snuxplore-nav-light-gray sm:bg-snuxplore-nav-medium-gray w-fit p-0 sm:p-2 rounded-lg space-x-1 sm:space-x-2">
                <Link href="/snugpt" className="sm:px-6 px-2 py-3 sm:bg-transparent bg-snuxplore-nav-medium-gray text-sm sm:text-xs text-gray-300 rounded-lg border border-white/10 hover:bg-snuxplore-nav-dark-gray">SNUGPT</Link>
                <Link href="/navigation" className="sm:px-6 px-2 py-3 sm:bg-transparent bg-snuxplore-nav-medium-gray text-sm sm:text-xs text-gray-300 rounded-lg border border-white/10 hover:bg-snuxplore-nav-dark-gray">Navigation</Link>
                <Link href="/about" className="sm:px-6 px-2 py-3 sm:bg-transparent bg-snuxplore-nav-medium-gray text-sm sm:text-xs text-gray-300 rounded-lg border border-white/10 hover:bg-snuxplore-nav-dark-gray">About</Link>
                <Link href="/roomfinder" className="sm:px-6 px-2 py-3 sm:bg-transparent bg-snuxplore-nav-medium-gray text-sm sm:text-xs text-gray-300 rounded-lg border border-white/10 hover:bg-snuxplore-nav-dark-gray">Room Finder</Link>
                {/* <a href="/contact" className="sm:px-6 px- py-3 sm:bg-transparent bg-snuxplore-nav-medium-gray text-sm sm:text-xs text-gray-300 rounded-lg border border-white/10 hover:bg-snuxplore-nav-dark-gray">Contact</a> */}
            </div>
        </div>
    );
}

export default Navbar;
