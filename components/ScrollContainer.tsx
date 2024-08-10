'use client'

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NavigationCard from "@/components/NavigationCard";
import { Places } from "@/models/interfaces";
import Map from "@/components/Map";
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
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ places }) => {
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
        <div className={'h-screen w-full bg-white flex flex-col md:flex-row overflow-y-hidden md:overflow-y-scroll'}>
            <div className={'h-full hidden w-1/3 bg-snuxplore-brown md:flex flex-col px-8 pt-8 justify-start items-center'}>
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
                        <NavigationCard key={place?.name} place={place as Places} />
                    ))}
                </div>
            </div>

            {!bottomDrawerStatus && <Button
                className={`flex md:hidden w-full h-fit text-3xl py-4 rounded-none bg-snuxplore-black hover:bg-snuxplore-black absolute z-50 bottom-0 font-nohemi-medium text-snuxplore-yellow`}
                onClick={() => setBottomDrawerStatus(true)}>
                <ChevronUp size={38} className={'mr-3'}/> Navigate Campus
            </Button>}

            <Drawer modal={false} snapPoints={[0.2,1]} open={bottomDrawerStatus} onClose={() => setBottomDrawerStatus(false)}>
                <DrawerContent className={'z-50 bg-snuxplore-black border-snuxplore-black h-[85%] sm:hidden flex'}>
                    <div className={'px-4 py-4 h-full flex flex-col'}>
                        <div className={'text-2xl w-full text-center font-nohemi-semibold text-snuxplore-yellow'}>
                            Navigate Campus
                        </div>
                        <div className={`text-sm text-white w-full text-justify mt-4`}>
                            {"We get it, navigating the university can be challenging! But have no worries, We can connect you to resources that will unlock all that Shiv Nadar University has to offer."}
                        </div>
                        <Separator className={'w-full mt-4 bg-snuxplore-yellow'} />
                        <div className={`mt-8 w-full transition-transform duration-300 font-nohemi-regular ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                            <Input
                                className={'w-full'}
                                placeholder={"Search for location, admin info or anything else"}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={'flex-1 mt-8 overflow-y-scroll space-y-4'}>
                            {filteredPlaces.map((place) => (
                                <NavigationCard key={place?.name} place={place as Places} />
                            ))}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

            <div className={'h-full w-full md:w-2/3 z-30'}>
                <Map places={filteredPlaces as Places[]}/>
            </div>
        </div>
    );
};

export default ScrollContainer;
