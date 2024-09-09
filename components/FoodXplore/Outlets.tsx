"use client";
import { useState, useEffect } from 'react';

const FoodExplore = () => {
  // Sample filters and food places
  const [filters, setFilters] = useState([
    { name: "Top Rated Spots", active: false },
    { name: "Trending", active: true },
    { name: "Budget-Friendly", active: false },
    { name: "Healthy Choices", active: false },
  ]);

  const [places] = useState([
    "A One Rama",
    "Swad Kathi",
    "Navin's Tea Stall",
    "GreenNox",
    "Mahesh's Dhaba",
    "19th Hole",
    "Spicy Tandoor",
    "Sushi Delight",
    "Burger Barn",
    "Cafe Mexicana",
    "Waffle World",
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    // Dynamically update itemsPerPage based on screen width
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 4 : 6);
    };

    // Set initial value
    updateItemsPerPage();

    // Add resize event listener
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage);
  };

  // Calculate items for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePlaces = places.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(places.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 min-h-screen text-white py-10 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4">
        What are you <span className="text-yellow-500">craving</span> today?
      </h1>
      <p className="text-center text-gray-300 max-w-md mb-6">
        Explore the best food options SNU has to offer. Whether you&#39re in the
        mood for something specific or just browsing for new culinary
        experiences, we&#39ve got you covered. Find your next meal effortlessly
        with FoodXplore.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter.active ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300"
            } hover:bg-yellow-500`}
            onClick={() => {
              setFilters(filters.map((f, i) => ({ ...f, active: i === index })));
              setCurrentPage(1); // Reset to first page when filter changes
            }}
          >
            {filter.name}
          </button>
        ))}
        <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <span className="text-gray-300">🔍</span>
        </button>
      </div>

      {/* Food Places Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        {visiblePlaces.map((place, index) => (
          <div
            key={index}
            className="relative group p-4 rounded-lg bg-gray-800 text-white transform transition-transform hover:scale-105"
          >
            {/* Placeholder Image */}
            <img
              src="/placeholder-image.jpg" // Replace with the actual placeholder image path
              alt={place}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />

            {/* Outlet Name */}
            <h3 className="text-lg font-semibold mb-2">{place}</h3>

            {/* Hoverable Buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
              <button className="w-3/4 mb-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                Locate
              </button>
              <button className="w-3/4 bg-gray-800 text-yellow-500 py-2 rounded-lg hover:bg-gray-700 transition">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          className={`text-gray-300 hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>
        
        {/* Page Numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${
                currentPage === i + 1 ? "text-yellow-500" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        
        {/* Next Button */}
        <button
          className={`text-gray-300 hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default FoodExplore;
