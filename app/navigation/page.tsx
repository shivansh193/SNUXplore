// Remove 'use client' directive - this will be a server component
import React from "react";
import { Places } from "@/models/interfaces";
import { promises as fs } from "fs";
import MergedHomeClient from "./HomeClient"; // We'll create this

export default async function Home() {
  // This runs on the server
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

  // Pass data to client component
  return <MergedHomeClient places={places} />;
}