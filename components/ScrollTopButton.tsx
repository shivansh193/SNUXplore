'use client';
import Image from "next/image"
import scrollTopSvg from '@/public/scrollTop.svg';

export default function ScrollTopButton () {
    const handleScrollTop = () => {
        if (window) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }

    return (
        <button onClick={() => handleScrollTop()} className={`rounded-full`}>
            <Image className={`w-[125px] aspect-square`} src={scrollTopSvg} alt={`UpArrow`}/>
        </button>
    )
}