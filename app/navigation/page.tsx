import React from "react";
import { Input } from "@/components/ui/input";
import NavigationCard from "@/components/NavigationCard";
import { Places } from "@/models/interfaces";
import { promises as fs } from "fs";
import ScrollContainer from "@/components/ScrollContainer";

export default async function Home() {
    // Read and parse the JSON data
    const file = await fs.readFile(process.cwd() + '/data/data.json', 'utf8');
    const data = JSON.parse(file);

    // Extract places from the JSON data
    const places: Places[] = Object.keys(data).flatMap((category) =>
        data[category].map((item: any) => ({
            name: item.name,
            image: item.image,
            link: item.location,
            description: item.description || "",
            lat: item.latitude,
            long: item.longitude,
        }))
    );

    return (
        <div className={'h-screen w-full bg-white flex flex-row'}>
            <ScrollContainer places={places}/>
        </div>
    );
}
