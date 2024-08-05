'use client'

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NavigationCard from "@/components/NavigationCard";
import { Places } from "@/models/interfaces";
import Map from "@/components/Map";

interface ScrollContainerProps {
    places: Places[];
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ places }) => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={'h-screen w-full bg-white flex flex-row'}>
            <div className={'h-full w-1/3 bg-snuxplore-brown flex flex-col px-8 pt-8 justify-start items-center'}>
                <div className={`w-full h-fit text-3xl text-white flex flex-row items-center transition-transform duration-300 font-nohemi-semibold ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    <img src={"/s.svg"} className={'mr-2'} />SNUXplore
                </div>
                <div className={`w-full h-fit text-3xl font-semibold mt-8 text-snuxplore-yellow transition-transform duration-300 font-nohemi-semibold ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>Navigate Campus</div>
                <div className={`w-full h-fit text-md mt-2 text-white font-nohemi transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    {"We get it, navigating the university can be challenging! But have no worries, We can connect you to resources that will unlock all that Shiv Nadar University has to offer."}
                </div>
                <div className={`mt-8 w-full transition-transform duration-300 font-nohemi-regular ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    <Input className={'w-full'} placeholder={"Search for location, admin info or anything else"} />
                </div>
                <div className={'w-full mt-8 h-full overflow-y-scroll space-y-4 no-scrollbar'}>
                    {places.map((place) => (
                        <NavigationCard key={place.name} place={place} />
                    ))}
                </div>
            </div>

            <div className={'h-full w-2/3'}>
                <Map places={places} />
            </div>
        </div>
    );
};

export default ScrollContainer;
