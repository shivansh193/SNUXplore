import React from "react";
import nohemi from "@/app/layout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface Places {
    name: string;
    image: string | null;
    link: string;
    latitude: number;
    longitude: number;
}

export default function Home(){


    return(
        <div className={'h-screen w-full bg-white flex flex-row'}>
            <div className={'h-full w-1/3 bg-snuxplore-brown flex flex-col px-8 pt-8 justify-start items-center'}>
                <div className={'w-full h-fit text-3xl text-white flex flex-row items-center'}><img src={"/s.svg"} />SNUXplore</div>
                <div className={'w-full h-fit text-3xl font-semibold mt-8 text-snuxplore-yellow'}>Navigate Campus</div>
                <div className={`w-full h-fit text-md mt-2 text-white font-nohemi`}>
                    {"We get it, navigating the university can be challenging! But have no worries, We can connect you to resources that will unlock all that Shiv Nadar University has to offer."}
                </div>
                <div className={'mt-8 w-full'}>
                    <Input className={'w-full'} placeholder={"Search for location, admin info or anything else"} />
                </div>
                <div className={'w-full mt-8 h-full overflow-y-scroll space-y-4 no-scrollbar'}>
                    <div
                        className={'w-full h-40 bg-white rounded-xl border-4 border-snuxplore-yellow flex flex-row items-center justify-start p-2 space-x-2'}>
                        <img src={"https://i.postimg.cc/1Rnznf56/amphi.jpg"} className={'w-[50%] h-[100%] rounded'}/>
                        <div className={'w-full h-full flex flex-col items-start justify-start mt-2 relative'}>
                            <div className={'text-snuxplore-black text-xl font-bold'}>Amphitheatre</div>
                            <div
                                className={'text-snuxplore-gray text-sm'}>{"The perfect place to showcase your creative side."}</div>
                            <Button
                                className={'h-fit w-full bg-snuxplore-black text-md absolute bottom-2 py-1 px-2'}>Locate</Button>
                        </div>
                    </div>
                    <div
                        className={'w-full h-40 bg-white rounded-xl border-4 border-snuxplore-yellow flex flex-row items-center justify-start p-2 space-x-2'}>
                        <img src={"https://i.postimg.cc/1Rnznf56/amphi.jpg"} className={'w-[50%] h-[100%] rounded'}/>
                        <div className={'w-full h-full flex flex-col items-start justify-start mt-2 relative'}>
                            <div className={'text-snuxplore-black text-xl font-bold'}>Amphitheatre</div>
                            <div
                                className={'text-snuxplore-gray text-sm'}>{"The perfect place to showcase your creative side."}</div>
                            <Button
                                className={'h-fit w-full bg-snuxplore-black text-md absolute bottom-2 py-1 px-2'}>Locate</Button>
                        </div>
                    </div>
                    <div
                        className={'w-full h-40 bg-white rounded-xl border-4 border-snuxplore-yellow flex flex-row items-center justify-start p-2 space-x-2'}>
                        <img src={"https://i.postimg.cc/1Rnznf56/amphi.jpg"} className={'w-[50%] h-[100%] rounded'}/>
                        <div className={'w-full h-full flex flex-col items-start justify-start mt-2 relative'}>
                            <div className={'text-snuxplore-black text-xl font-bold'}>Amphitheatre</div>
                            <div
                                className={'text-snuxplore-gray text-sm'}>{"The perfect place to showcase your creative side."}</div>
                            <Button
                                className={'h-fit w-full bg-snuxplore-black text-md absolute bottom-2 py-1 px-2'}>Locate</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
