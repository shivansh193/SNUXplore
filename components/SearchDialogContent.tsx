'use client';

import { Search } from "lucide-react";
import { Places } from "@/models/interfaces";
import React, { useState } from "react";
import NavigationCard from "@/components/NavigationCard";
import SearchCard from "@/components/SearchCard";

export default function SearchDialogContent({ places }: { places: Places[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Function to normalize the string by removing non-alphanumeric characters and converting to lowercase
    const normalizeString = (str: string) => {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    // Create a unique list of places by name
    const uniquePlaces = Array.from(new Set(places.map(place => place.name)))
        .map(name => places.find(place => place.name === name));

    // Filter places based on the search query
    const filteredPlaces = searchQuery
        ? uniquePlaces.filter(place =>
            place && normalizeString(place.name).includes(normalizeString(searchQuery))
        )
        : [];

    return (
        <div>
            <div className={`flex flex-row gap-2 items-center pl-2 bg-neutral-950 h-[40px] w-full rounded-t-lg`}>
                <Search />
                <input
                    className={`h-full flex flex-grow rounded-tr-lg outline-none bg-inherit`}
                    placeholder={`Search`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className={`px-2 overflow-y-auto max-h-[400px] pt-4`}>
                {/* Render filtered places */}
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                        <SearchCard key={place?.name} place={place as Places} />
                    ))
                ) : (
                    searchQuery && <p className="text-center text-gray-500">No results found</p>
                )}
            </div>
        </div>
    );
}
