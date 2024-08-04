import logoSvg from '@/public/logo.svg';
import auntySvg from '@/public/aunty.svg';
import mailSvg from '@/public/mail.svg';
import phoneSvg from '@/public/phone.svg';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={`bg-snuxplore-brown text-white`}>
            <footer className={`relative h-fit w-full flex flex-col items-center bg-snuxplore-footer-black rounded-t-3xl pt-6`}>
                
                {/* Applies gradient, Do not touch */}
                <div className={`absolute fade-t bottom-0 left-0 w-full h-[250px] bg-gradient-to-r from-snuxplore-footer-g1 via-snuxplore-footer-g2 to-snuxplore-footer-g1`}></div>
                
                <Image className={`w-1/2 mt-6 mb-8`} src={logoSvg} alt={`SNUXplore Logo`}/>

                
                <div className={`flex flex-col items-center mb-6 text-neutral-500 text-xl font-montserrat-medium`}>
                    <p className={`font-nohemi-medium text-2xl text-white mb-0`}>Quick Links</p>
                    <a href='/gpt'>SNU-GPT</a>
                    <a href='/navigation'>Navigation</a>
                    <a href='/food'>FoodXplore</a>
                    <a href='/about'>About Us</a>
                    <a href='/contact'>Contact Us</a>
                </div>

                
                <div className={`flex flex-col items-center mb-6 text-neutral-500 text-xl font-montserrat-medium`}>
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

                <Image className={`w-2/3 z-10`} src={auntySvg} alt={`SNUXplore Mascot`}/>
                <div className={`h-[5px] w-full bg-snuxplore-yellow z-10`}></div>
            </footer>   
        </div>
    )
}