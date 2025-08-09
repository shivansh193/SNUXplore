// components/AcademicsGrid.tsx

import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface Dean {
  title: string;
  name: string;
}

interface HOD {
  department: string;
  name: string;
}

interface AcademicData {
  id: number;
  block: string;
  school: string;
  dean: Dean;
  hods: HOD[];
}

interface ContactCardProps {
  block: string;
  school: string;
  dean: Dean;
  hods: HOD[];
}

const academicsData: AcademicData[] = [
  {
    id: 1,
    block: "A-Block",
    school: "School of Natural Sciences",
    dean: {
      title: "Dean of School",
      name: "Dr. Sanjeev Galande",
    },
    hods: [
      { department: "Life Sciences", name: "Dr. Sanjeev Galande" },
      { department: "Chemistry", name: "Dr. Parthapratim Munshi" },
      { department: "Physics", name: "Dr. Sankar Dhar" },
      { department: "Mathematics", name: "Dr. Amber Habib" },
    ],
  },
  {
    id: 2,
    block: "B-Block",
    school: "School of Management & Entrepreneurship",
    dean: {
      title: "Dean of School",
      name: "Dr. Bibek Bannerjee",
    },
    hods: [
      { department: "Bachelors of management Studies", name: "Dr Shalu Kalra" },
    ],
  },
  {
    id: 3,
    block: "A-Block",
    school: "School of Natural Sciences",
    dean: {
      title: "Dean of School",
      name: "Dr. Sanjeev Galande",
    },
    hods: [
      { department: "Life Sciences", name: "Dr. Sanjeev Galande" },
      { department: "Chemistry", name: "Dr. Parthapratim Munshi" },
      { department: "Physics", name: "Dr. Sankar Dhar" },
      { department: "Mathematics", name: "Dr. Amber Habib" },
    ],
  },
];

const ContactCard: React.FC<ContactCardProps> = ({ block, school, dean, hods }) => (
  <div className="bg-white/[.07] backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 w-full font-sans">
    <p className="text-gray-400 text-sm mb-1">{block}</p>
    <h3 className="text-white text-xl font-bold mb-5">{school}</h3>

    <div className="space-y-5">
      {/* Dean Section */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-gray-200 text-3xl" />
          <div>
            <p className="text-white font-medium">{dean.title}</p>
            <p className="text-gray-400 text-sm">{dean.name}</p>
          </div>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
          Contact
        </button>
      </div>

      <hr className="border-white/10" />

      {/* Departments & HODs Section */}
      <div>
        <h4 className="text-white font-bold text-lg mb-4">Departments & HODs</h4>
        <div className="space-y-4">
          {hods.map((hod, index) => (
            <div key={index} className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-gray-200 text-3xl" />
                <div>
                  <p className="text-white font-medium">{hod.department}</p>
                  <p className="text-gray-400 text-sm">{hod.name}</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                Contact
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AcademicsGrid: React.FC = () => {
  return (
    // More right margin added
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-4 mr-6 md:ml-8 md:mr-12">
      {academicsData.map((data) => (
        <ContactCard
          key={data.id}
          block={data.block}
          school={data.school}
          dean={data.dean}
          hods={data.hods}
        />
      ))}
    </div>
  );
};

export default AcademicsGrid;
