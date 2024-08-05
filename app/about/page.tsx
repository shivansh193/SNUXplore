import MemberGallery from '@/components/MemberGallery';
import foundersPng from '@/public/founders.png';
import Image from 'next/image';

export default function About() {
    return (
        <div className={`min-h-screen max-w-screen bg-gradient-to-b from-snuxplore-footer-black via-snuxplore-footer-black to-snuxplore-brown text-white`}>
            <div className={`h-screen flex md:flex-row md:justify-between flex-col`}>
                <div className={`md:w-1/2 w-full py-6 px-6 md:grid md:place-items-center`}>
                    <div className={`md:w-2/3 w-full md:ml-20`}>
                        <p className={`font-nohemi-black text-snuxplore-yellow md:text-8xl text-6xl`}>Meet the founders</p>
                        
                        <p>What began as a simple idea in the library has now become a reality. We&apos;ve navigated the hurdles with the support of the Student Council, DSA, and Admin, and we&apos;re thrilled to present the features we believe will revolutionise your campus life.</p>
                        
                        <div className={`w-full mt-4 flex flex-row md:justify-start md:gap-4 justify-between`}>
                            <p className={`font-montserrat-extrabold text-black bg-snuxplore-yellow md:px-4 px-2.5 py-1 rounded-3xl`}>Prabhav Pandey</p>
                            <p className={`font-montserrat-extrabold text-black bg-snuxplore-yellow md:px-4 px-2.5 py-1 rounded-3xl`}>Keshav Dubey</p>
                        </div>
                    </div>
                </div>

                <div className={`md:w-1/2 w-full flex md:justify-end justify-center`}>
                    <Image priority className={`w-[80%] md:rounded-none rounded-lg brightness-50`} src={foundersPng} alt={`Founders Image`}/>
                </div>
            </div>

            <div className={`h-fit w-full mt-10`}>
                <div className={`w-full flex flex-col items-center font-nohemi-bold md:text-7xl text-4xl`}>
                    <p>Meet the <span className={`text-snuxplore-footer-g2`}>Team</span></p>
                    <p>Behind the <span className={`text-snuxplore-footer-g1`}>Magic</span></p>
                </div>

                <div className={`mt-4`}>
                    <MemberGallery />
                </div>
            </div>
        </div>
    )
}