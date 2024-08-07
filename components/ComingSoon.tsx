import Particles from "./MagicUI/particles";

export default function ComingSoon() {
    return (
        <div className={`relative h-screen w-screen overflow-hidden bg-snuxplore-brown grid place-items-center`}>
            <Particles
                staticity={100}
                quantity={50}
                className={`absolute inset-0`}
                color="#F0BD1A"
            />
            <Particles
                staticity={100}
                quantity={50}
                className={`absolute inset-0`}
                color="#E37537"
            />
            <div className={`px-14 z-10`}>
                <p className={`md:text-9xl text-7xl text-center font-nohemi-extrabold text-snuxplore-yellow`}>Coming <span className={`text-snuxplore-orange`}>Soon</span></p>
            </div>
        </div>
    )
}