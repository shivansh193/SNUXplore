import Image from 'next/image';

// Image imports
import logoSvg from '@/public/logo.svg';
import auntySvg from '@/public/aunty.svg';
import mailSvg from '@/public/mail.svg';
import phoneSvg from '@/public/phone.svg';
import sSvg from '@/public/s.svg';
import ScrollTopButton from './ScrollTopButton';

export default function Footer() {
    return (
        <div className={`bg-snuxplore-brown text-white`}>
            <footer className={`relative h-fit w-full flex md:flex-row flex-col md:justify-around md:items-start items-center bg-snuxplore-footer-black rounded-t-3xl pt-6`}>
                {/* Applies gradient, Do not touch */}
                <div className={`absolute fade-t bottom-0 left-0 w-full md:h-[125px] h-[250px] bg-gradient-to-r from-snuxplore-footer-g1 via-snuxplore-footer-g2 to-snuxplore-footer-g1`}></div>

                <Image className={`md:w-[15%] w-1/2 md:mt-16 mt-6 md:mb-60 mb-8`} src={logoSvg} alt={`SNUXplore Logo`}/>

                <div className={`flex flex-col md:items-start items-center md:mt-16 mb-6 text-neutral-500 text-xl font-montserrat-medium`}>
                    <p className={`font-nohemi-medium text-2xl text-white mb-0`}>Quick Links</p>
                    <a href='/gpt'>SNU-GPT</a>
                    <a href='/navigation'>Navigation</a>
                    <a href='/food'>FoodXplore</a>
                    <a href='/about'>About Us</a>
                    <a href='/contact'>Contact Us</a>
                </div>

                <div className={`flex flex-col md:items-start items-center md:mt-16 mb-6 text-neutral-500 text-xl font-montserrat-medium`}>
                    <p className={`font-nohemi-medium text-2xl text-white mb-0`}>Get In Touch</p>
                    <div className={`flex flex-row gap-2`}>
                        <Image className={`w-[20px] aspect-square`} src={mailSvg} alt={`E-Mail Icon`}/>
                        <p>snuxplore@gmail.com</p>
                    </div>
                    <div className={`flex flex-row gap-2`}>
                        <Image className={`w-[20px] aspect-square`} src={phoneSvg} alt={`Telephone Icon`}/>
                        <p>+91 95802 49433</p>
                    </div>
                </div>

                <div className={`md:flex md:flex-col md:items-center md:gap-40 hidden h-[100%] w-fit z-10`}>
                    <Image className={`mt-`} src={sSvg} alt={`SNUXplore`}/>
                    <ScrollTopButton />
                </div>

                <Image className={`md:absolute md:left-36 md:bottom-0 md:w-[12%] w-2/3 z-10`} src={auntySvg} alt={`SNUXplore Mascot`}/>
                <div className={`md:absolute md:bottom-0 h-[5px] w-full bg-snuxplore-yellow z-10`}></div>
            </footer>
        </div>
    )
}