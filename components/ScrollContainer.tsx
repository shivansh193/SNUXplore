'use client'

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NavigationCard from "@/components/NavigationCard";
import { Places } from "@/models/interfaces";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ScrollContainerProps {
    places: Places[];
    onLocateClick?: (place: Places) => Promise<void>;
    isLoading?: boolean;
    showMapPanel?: boolean; // New prop to control layout
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ 
    places, 
    onLocateClick, 
    isLoading = false,
    showMapPanel = false // Default to false when no map is shown
}) => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [bottomDrawerStatus, setBottomDrawerStatus] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState("");

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

    const uniquePlaces = Array.from(new Set(places.map(place => place.name)))
        .map(name => places.find(place => place.name === name));

    const filteredPlaces = uniquePlaces.filter(place =>
        place?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen w-1/3 bg-white flex flex-col overflow-hidden">
            <div className="h-full bg-snuxplore-brown flex flex-col px-8 pt-8 justify-start items-center">
                <div className={`w-full h-fit text-3xl text-white flex flex-row items-center transition-transform duration-300 font-nohemi-semibold ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    <img src={"/s.svg"} className={'mr-2'} />SNUXplore
                </div>
                <div className={`w-full h-fit text-3xl font-semibold mt-8 text-snuxplore-yellow transition-transform duration-300 font-nohemi-semibold ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>Navigate Campus</div>
                <div className={`w-full h-fit text-md mt-2 text-white font-nohemi transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    {"We get it, navigating the university can be challenging! But have no worries, We can connect you to resources that will unlock all that Shiv Nadar University has to offer."}
                </div>
                <div className={`mt-8 w-full transition-transform duration-300 font-nohemi-semibold ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    <Input
                        className={'w-full'}
                        placeholder={"Where do you wanna go today?"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={'w-full mt-8 h-full overflow-y-scroll space-y-4 no-scrollbar'}>
                    {filteredPlaces.map((place) => (
                        <NavigationCard 
                            key={place?.name} 
                            place={place as Places}
                            onLocateClick={onLocateClick}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollContainer;