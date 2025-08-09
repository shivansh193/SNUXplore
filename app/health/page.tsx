// components/SafetyPage.jsx
import React from 'react';
import { FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

// --- Data for the two sections, using "Lorem Ipsum" as per the design ---

const emergencySupportContacts = [
  { name: "HCL Healthcare", role: "Reception" },
  { name: "Dr. Lorem Ipsum", role: "Physician" },
  { name: "Dr. Lorem Ipsum", role: "Psychologist" },
  { name: "Dr. Anshu Paliwal", role: "Head - Student Life" },
  { name: "Mr. Lorem Ipsum", role: "Head - Security" },
  { name: "Dr. Lorem Ipsum", role: "Head of Hostels" },
];

const hostelSupportContacts = [
  { name: "Lorem Ipsum", role: "Warden Chilika" },
  { name: "Lorem Ipsum", role: "Warden Sunderbans" },
  { name: "Lorem Ipsum", role: "Warden Gir" },
  { name: "Lorem Ipsum", role: "Warden Kaziranga" },
  { name: "Lorem Ipsum", role: "Warden Kaims" },
  { name: "Lorem Ipsum", role: "Warden Kaims" },
  { name: "Lorem Ipsum", role: "Warden Mukkunmalai" },
  { name: "Lorem Ipsum", role: "Warden Sunderbans" },
  { name: "Lorem Ipsum", role: "Warden Gir" },
];

// --- Reusable component for each contact card ---
const SafetyContactCard = ({ name, role }) => (
  <div className="bg-white rounded-xl p-4 shadow-lg flex flex-col justify-between">
    <div>
      <h3 className="text-black text-lg font-bold">{name}</h3>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      <button className="bg-black text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 py-2 hover:bg-gray-800 transition-colors">
        <FaLocationArrow />
        <span>Navigate</span>
      </button>
      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-md flex items-center justify-center gap-1.5 py-2 hover:opacity-90 transition-opacity">
        <FaPhoneAlt />
        <span>Contact</span>
      </button>
      <button className="bg-black text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 py-2 hover:bg-gray-800 transition-colors">
        <IoMdMail className="text-sm" />
        <span>Mail</span>
      </button>
    </div>
  </div>
);


// --- The Main Page Component ---
const SafetyPage = () => {
  return (
    <div className="bg-[#1C1C1C] text-white min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your Safety & Well-being <span className="text-orange-500">is</span><br />
            <span className="text-yellow-400">Our Priority</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-gray-300">
            Welcome to SNUxplore's Supportive Initiative, where we prioritize health and safety. We understand that university life can be full of challenges. Stay prepared with emergency helplines, mental health contacts, and crucial resources for a safe campus experience. Your safety matters to us.
          </p>
        </div>

        {/* --- Emergency Support Section --- */}
        <div className="mt-10 text-center">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-opacity">
            Emergency Support
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencySupportContacts.map((contact, index) => (
            <SafetyContactCard key={`emergency-${index}`} name={contact.name} role={contact.role} />
          ))}
        </div>

        {/* --- Emergency Hostel Support Section --- */}
        <div className="mt-20 text-center">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-opacity">
            Emergency Hostel Support
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostelSupportContacts.map((contact, index) => (
            <SafetyContactCard key={`hostel-${index}`} name={contact.name} role={contact.role} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default SafetyPage;