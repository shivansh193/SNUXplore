import { Button } from "@/components/ui/button";
import React from "react";
import { Places } from "@/models/interfaces";
import { Loader } from 'lucide-react';

interface NavigationCardProps {
    place: Places;
    onLocateClick?: (place: Places) => Promise<void>;
    isLoading?: boolean;
}

export default function NavigationCard({ 
    place, 
    onLocateClick, 
    isLoading = false 
}: NavigationCardProps) {
    
    const handleLocateClick = () => {
        if (onLocateClick && !isLoading) {
            onLocateClick(place);
        }
    };

    return (
        <div className="w-full bg-white rounded-xl border-4 border-snuxplore-yellow flex flex-col md:flex-row items-center justify-start p-2 space-x-0 md:space-x-2 space-y-2 md:space-y-0 h-auto md:h-40">
            {/* Image Section */}
            <img
                src={place.image}
                className="w-full md:min-w-[50%] h-40 md:h-full object-cover rounded"
                alt={place.name}
            />

            {/* Text & Button Section */}
            <div className="w-full h-full flex flex-col items-start justify-start relative">
                <div className="text-snuxplore-black text-lg md:text-xl font-bold font-nohemi-medium">
                    {place.name}
                </div>
                <div className="text-snuxplore-gray text-xs md:text-sm">
                    {place.description}
                </div>
                
                {/* Conditional rendering: use onLocateClick if provided, otherwise fallback to link */}
                {onLocateClick ? (
                    <Button 
                        onClick={handleLocateClick}
                        disabled={isLoading}
                        className="w-full bg-snuxplore-black text-sm md:text-md py-1 px-2 mt-2 md:mt-4 font-nohemi-regular disabled:opacity-50 disabled:cursor-not-allowed hover:bg-snuxplore-black"
                    >
                        {isLoading ? (
                            <>
                                <Loader className="h-4 w-4 animate-spin mr-2" />
                                Getting Directions...
                            </>
                        ) : (
                            'Locate'
                        )}
                    </Button>
                ) : (
                    <a href={place.link} className="w-full">
                        <Button className="w-full bg-snuxplore-black text-sm md:text-md py-1 px-2 mt-2 md:mt-4 font-nohemi-regular">
                            Locate
                        </Button>
                    </a>
                )}
            </div>
        </div>
    );
}