import React from "react";
import { Places } from "@/models/interfaces";

interface NavigationCardProps {
    place: Places;
}

export default function SearchCard({ place }: NavigationCardProps) {
    return (
        <a href={place.link} className="w-full">
            <div className="w-full bg-neutral-950 rounded-xl flex flex-col md:flex-row items-center justify-start p-2 space-x-0 md:space-x-2 space-y-2 md:space-y-0 h-auto md:h-40">
                {/* Image Section */}
                <img
                    src={place.image}
                    className="w-full md:min-w-[50%] h-40 md:h-full object-cover rounded"
                    alt={place.name}
                />

                {/* Text Section */}
                <div className="w-full h-full flex flex-col items-start justify-start relative">
                    <div className="text-white text-lg md:text-xl font-bold font-nohemi-medium">
                        {place.name}
                    </div>
                    <div className="text-snuxplore-gray text-xs md:text-sm">
                        {place.description}
                    </div>
                </div>
            </div>
        </a>
    );
}
