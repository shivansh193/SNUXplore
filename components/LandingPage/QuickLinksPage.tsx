import Link from 'next/link'
import Image from 'next/image'

const QuickLinks = () => {
  return (
    <div className="bg-gray-900 text-white p-8 font-sans">
      <h2 className="text-yellow-400 text-3xl font-bold mb-6">Quick Links</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  )
}

const LinkCard = ({ title, description, imageUrl, linkUrl }: any) => {
  return (
    <Link href={linkUrl} className="bg-gray-800 rounded-2xl p-6 flex flex-col h-full transition-colors hover:bg-gray-700">
      <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
        {title} <span className="text-sm">↗</span>
      </h3>
      <div className="border-t border-gray-700 my-2"></div>
      <p className="text-sm mb-4 flex-grow">{description}</p>
      <Image 
        src={imageUrl} 
        alt={title} 
        width={300} 
        height={200} 
        className="w-full h-auto rounded-xl"
      />
    </Link>
  )
}

const ComingSoonCard = ({ title, description }: any) => {
  return (
    <div className="bg-orange-600 rounded-2xl p-6 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="border-t border-orange-500 my-2"></div>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default QuickLinks