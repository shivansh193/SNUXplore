import Link from 'next/link';
import Image from 'next/image';

const QuickLinks = () => {
    return (
        <div className="bg-black text-white p-4 sm:p-8 font-sans flex flex-col sm:flex-row justify-center z-40">
            <div className="w-full sm:w-[90%] bg-snuxplore-brown p-6 sm:p-10 rounded-3xl z-40">
                <h2 className="text-yellow-400 text-3xl sm:text-5xl font-nohemi-bold mb-6 text-center sm:text-left">Quick Links</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <LinkCard
                        title="Meet the Team"
                        description="What began as a simple idea in the library has now become a reality. We've grown from an individual to a group, and we'd love for you to meet the faces behind our work."
                        imageUrl="/MeetTheTeam.png"
                        linkUrl="/team"
                    />

                    <LinkCard
                        title="Get In Touch"
                        description="Have any questions or feedback? We value your input and would love to hear your thoughts, suggestions, and inquiries. Reach out to us today!"
                        imageUrl="/GetInTouch.png"
                        linkUrl="/contact"
                    />

                    <ComingSoonCard
                        title="Coming Soon"
                        description="Loads of new features are coming to enhance your experience with us. Stay tuned!"
                    />
                </div>
            </div>
        </div>
    );
}

const LinkCard = ({ title, description, imageUrl, linkUrl }: any) => {
    const words = title.split(' ');
    const firstTwoWords = words.slice(0, 2).join(' ');
    const remainingWords = words.slice(2).join(' ');

    return (
        <Link href={linkUrl} className="bg-snuxplore-dark-gray rounded-2xl p-4 sm:p-6 hover:scale-105 flex flex-col h-full transition-colors hover:bg-orange-500">
            <div className="w-full relative">
                <h3 className="text-2xl sm:text-4xl text-snuxplore-yellow font-nohemi-medium mb-2 flex justify-between items-center">
                    {firstTwoWords}<br />{remainingWords}
                </h3>
                <img src="/linkarrow.svg" className="absolute right-0 top-0 h-8 sm:h-12" />
            </div>
            <div className="border-t border-snuxplore-yellow mt-4 mb-4"></div>
            <p className="text-sm sm:text-base mb-4 flex-grow">{description}</p>
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={200}
                className="w-full h-auto rounded-xl"
            />
        </Link>
    );
}

const ComingSoonCard = ({ title, description }: any) => {
    return (
        <div className="bg-snuxplore-dark-orange rounded-2xl p-4 sm:p-6 flex flex-col h-full">
            <h3 className="text-2xl sm:text-4xl font-nohemi-medium mb-2 text-black">Coming <br /> Soon</h3>
            <div className="border-t border-black my-4"></div>
            <p className="text-sm sm:text-base">{description}</p>
        </div>
    );
}

export default QuickLinks;
