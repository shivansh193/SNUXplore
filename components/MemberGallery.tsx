'use client';
import { useState } from "react";
import { memberData } from "@/data/memberData";
import Image from "next/image";

/*
    0 - Project Leads
    1 - Development
    2 - Marketing
    3 - Data Curation
    4 - Hall of Fame
*/

export default function MemberGallery() {

    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div className={`flex flex-col items-center justify-center md:pb-20 pb-6`}>
            <div className={`md:w-[55%] w-[90%] grid md:grid-cols-5 grid-cols-2 place-items-center gap-y-3 md:mb-10 mb-4`}>
                <button onClick={() => setCurrentTab(0)}>
                    <p className={`text-lg font-montserrat-extrabold rounded-full w-[150px] py-1 border-2 border-snuxplore-yellow  transition-all duration-200 bg-snuxplore-footer-${currentTab === 0 ? 'g1 text-white' : 'g2 text-black hover:opacity-50'}`}>
                        Project Leads
                    </p>
                </button>
                <button onClick={() => setCurrentTab(1)}>
                    <p className={`text-lg font-montserrat-extrabold rounded-full w-[150px] py-1 border-2 border-snuxplore-yellow  transition-all duration-200 bg-snuxplore-footer-${currentTab === 1 ? 'g1 text-white' : 'g2 text-black hover:opacity-50'}`}>
                        Development
                    </p>
                </button>
                <button onClick={() => setCurrentTab(2)}>
                    <p className={`text-lg font-montserrat-extrabold rounded-full w-[150px] py-1 border-2 border-snuxplore-yellow  transition-all duration-200 bg-snuxplore-footer-${currentTab === 2 ? 'g1 text-white' : 'g2 text-black hover:opacity-50'}`}>
                        Marketing
                    </p>
                </button>
                <button onClick={() => setCurrentTab(3)}>
                    <p className={`text-lg font-montserrat-extrabold rounded-full w-[150px] py-1 border-2 border-snuxplore-yellow  transition-all duration-200 bg-snuxplore-footer-${currentTab === 3 ? 'g1 text-white' : 'g2 text-black hover:opacity-50'}`}>
                        Data Curation
                    </p>
                </button>
                <button onClick={() => setCurrentTab(4)}>
                    <p className={`text-lg font-montserrat-extrabold rounded-full w-[150px] py-1 border-2 border-snuxplore-yellow  transition-all duration-200 bg-snuxplore-footer-${currentTab === 4 ? 'g1 text-white' : 'g2 text-black hover:opacity-50'}`}>
                        Hall of Fame
                    </p>
                </button>
            </div>

            {memberData.map((teamMembers, teamIndex) => (
                <div key={teamIndex} className={`w-[95%] md:w-[80%] md:gap-y-10 gap-y-4 place-items-center md:grid-cols-${Math.min(teamMembers.length, 3)} grid-cols-${Math.min(teamMembers.length, 2)} ${currentTab === teamIndex ? 'grid' : 'hidden'}`}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={`bg-snuxplore-member-frame md:w-[320px] w-[170px] md:h-[350px] h-[195px] flex flex-col justify-start items-center gap-1 rounded-xl`}>
                            <p className={`text-sm md:text-base font-montserrat-bold text-snuxplore-footer-g1 mt-2`}>
                                {member.name}
                            </p>
                            {member.image === null ? (
                                <div className={`md:w-[300px] w-[150px] aspect-square bg-neutral-950`}>

                                </div>
                            ) : (
                                <Image className={`md:w-[300px] w-[150px] aspect-square`} src={member.image} alt={`${member.name} Image`}/>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}