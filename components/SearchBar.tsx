'use client';
import sSvg from '@/public/s.svg';
import Image from 'next/image';
import sBWSvg from '@/public/sbw.svg';
import { Search } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';
  

export default function SearchBar() {
    return (
        <div className={`md:w-[700px] w-full h-[35px] grid place-items-center absolute md:top-4 top-10 md:left-1/2 md:-translate-x-1/2 z-[40] `}>
            <div className={`h-full md:w-[680px] w-[300px] flex flex-row gap-2 items-center justify-center`}>
                <Image className={`w-[30px] aspect-square hidden md:flex`} src={sSvg} alt={`S`}/>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className={`md:cursor-text px-2 flex flex-row items-center gap-2 flex-grow h-full bg-neutral-400/80 rounded-lg backdrop-blur-sm`}>
                            <Image className={`w-[25px] aspect-square grayscale flex md:hidden`} src={sBWSvg} alt={`S`}/>
                        
                            <p className={`md:hidden font-montserrat-medium text-lg`}>Search</p>
                        
                            <div className={`md:flex md:flex-row md:items-center md:gap-2 md:w-full hidden`}>
                                <Search className={`h-[20px] aspect-square`}/>
                                <p>Search</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className={`w-[80%] border-2 border-neutral-800 rounded-lg bg-snuxplore-brown text-white px-0 pt-0`}>
                        {/* <Input className={`text-black`} /> */}
                        <SearchDialogContent />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

function SearchDialogContent() {
    return (
        <div>
            <div className={`flex flex-row gap-2 items-center pl-2 bg-neutral-950 h-[40px] w-full rounded-t-lg`}>
                <Search />
                <input className={`h-full flex flex-grow rounded-tr-lg outline-none bg-inherit`} placeholder={`Search`}/>
            </div>
            <div className={`px-2`}>
            </div>
        </div>
    ) 
}