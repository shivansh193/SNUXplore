import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
const LandingPage = () => {
  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
          Redefined Intelligence.<br />
          Comprehensive Guidance.<br />
          Ultimate Campus Support.
        </h1>
        <p className="mb-8 text-sm md:text-base">
          Introducing Mahesh 5.0: The enhanced AI mentor, smarter, faster, and more comprehensive than ever. He is a new voice and solid friend for student guidance. Elevating student support to all-new levels.
          Streamline your support, save time, and experience your campus life like never before.
        </p>
        <Link href='/snugpt/gpt'>
        <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300">
          Begin
        </button>
        </Link>
      </div>
      <div className="absolute top-4 right-4 flex space-x-4">
        <Twitter className="w-6 h-6" />
        <Instagram className="w-6 h-6" />
        <Linkedin className="w-6 h-6" />
        <Facebook className="w-6 h-6" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400"></div>
    </div>
  <Footer />
  </div>
  );
};

export default LandingPage;