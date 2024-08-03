import Image from 'next/image';

export default function QuickLinkCard({ imageSrc, heading, description }: any) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-yellow-500">{heading}</h3>
                <div className="border-t-4 border-yellow-500 mb-4"></div>
                <p className="text-white bg-gray-800 p-4 rounded-md">{description}</p>
            </div>
            <div className="relative w-full h-40">
                <Image src={imageSrc} alt={heading} layout="fill" objectFit="cover" />
            </div>
        </div>
    );
}
