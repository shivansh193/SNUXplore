"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import data from "../../public/data/foodxplore";

// Add this interface above the MenuModal component
interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: Record<string, Array<{ 
    Item: string; 
    Price?: string | number; 
  }>>;
  selectedRestaurant: string;
}

const MenuModal = ({ isOpen, onClose, menuData, selectedRestaurant }: MenuModalProps) => {
  if (!isOpen) return null;

  // Get menu for the selected restaurant
  const selectedMenu = menuData[selectedRestaurant] || [];
  console.log(selectedRestaurant)
  console.log(menuData[selectedRestaurant])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{selectedRestaurant} Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {selectedMenu.length ? (
            <div className="space-y-4">
              {selectedMenu.map((menuItem, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span className="text-white font-medium">{menuItem.Item}</span>
                  <span className="text-yellow-500 font-bold">₹{menuItem.Price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No menu items available
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};

const FoodExplore = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const [filters, setFilters] = useState([
    { name: "Top Rated Spots", active: false },
    { name: "Trending", active: true },
    { name: "Budget-Friendly", active: false },
    { name: "Healthy Choices", active: false },
  ]);

  const [places] = useState([
    { name: "A One Rama", location: "https://maps.google.com/?q=A+One+Rama+SNU" },
    { name: "Swad Kathi roll", location: "https://maps.google.com/?q=Swad+Kathi+SNU" },
    { name: "Naveen", location: "https://maps.google.com/?q=Navins+Tea+Stall+SNU" },
    { name: "Fat guy kitchen", location: "" },
    { name: "Mama Fu", location: "" },
    { name: "Burgrill", location: "" },
    { name: "Bharityam", location: "" },
    { name: "Koyla Kebab", location: "" },
    { name: "surya", location: "" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 4 : 6);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePlaces = places.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(places.length / itemsPerPage);

  const handleMenuView = (placeName: string) => {
    setSelectedRestaurant(placeName);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 min-h-screen text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">
        What are you <span className="text-yellow-500">craving</span> today?
      </h1>
      <p className="text-center text-gray-300 max-w-md mb-6">
        Explore the best food options SNU has to offer. Find your next meal effortlessly with FoodXplore.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter.active ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300"
            } hover:bg-yellow-500`}
            onClick={() => {
              setFilters(filters.map((f, i) => ({ ...f, active: i === index })));
              setCurrentPage(1);
            }}
          >
            {filter.name}
          </button>
        ))}
        <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <span className="text-gray-300">🔍</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        {visiblePlaces.map((place, index) => (
          <div
            key={index}
            className="relative group p-4 rounded-lg bg-gray-800 text-white transform transition-transform hover:scale-105"
          >
            <img
              src="https://via.placeholder.com/400x320"
              alt={place.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />

            <h3 className="text-lg font-semibold mb-2">{place.name}</h3>

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
              <a
                href={place.location}
                target="_blank"
                rel="noopener noreferrer"
                className="w-3/4 mb-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition text-center"
              >
                Locate
              </a>
              <button
                onClick={() => handleMenuView(place.name)}
                className="w-3/4 bg-gray-800 text-yellow-500 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          className={`text-gray-300 hover:text-white ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${
                currentPage === i + 1
                  ? "text-yellow-500"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className={`text-gray-300 hover:text-white ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>

      {/* Menu Modal */}
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuData={data}
        selectedRestaurant={selectedRestaurant}
      />
    </div>
  );
};

export default FoodExplore;
