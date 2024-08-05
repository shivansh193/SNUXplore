import { Button } from "@/components/ui/button";
import React from "react";
import {Places} from "@/models/interfaces";

interface NavigationCardProps {
    place: Places;
}

export default function NavigationCard({ place }: NavigationCardProps) {
    return (
        <div className="w-full h-40 bg-white rounded-xl border-4 border-snuxplore-yellow flex flex-row items-center justify-start p-2 space-x-2">
            <img src={place.image} className="min-w-[50%] h-[100%] rounded" />
            <div className="w-full h-full flex flex-col items-start justify-start mt-2 relative">
                <div className="text-snuxplore-black text-xl font-bold font-nohemi-medium">{place.name}</div>
                <div className="text-snuxplore-gray text-sm">
                    {place.description}
                </div>
                <a href={place.link}>
                    <Button className="h-fit w-full bg-snuxplore-black text-md absolute bottom-2 py-1 px-2  font-nohemi-regular">Locate</Button>
                </a>
            </div>
        </div>
    );
}
