// components/AdminHeader.jsx

import React from 'react';

const AdminHeader = () => {
  return (
    <div className="text-center my-10 md:my-16">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
        {/* We use spans to apply different colors to each word */}
        <span className="text-yellow-400">Admin & </span>
        <span className="text-orange-500">Contacts</span>
      </h1>
      <p className="text-gray-400 max-w-md mx-auto px-4">
        This page contains all the information that bridges you to the
        Administration and DSA.
      </p>
    </div>
  );
};

export default AdminHeader;