import React, { useState } from "react";
import Papa from "papaparse";
import { FaPlus, FaList, FaFileExport } from "react-icons/fa"; // Icons for Add, Categories, Export

const Sidebar = ({ onCategoryChange, setIsModalOpen, memories }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const categories = ["All Categories", "Family", "Work", "Vacation"];

  const listItemClass =
    "py-2 px-4 text-white cursor-pointer hover:bg-blue-600 rounded-md flex items-center gap-2";

  const handleExport = () => {
    const csv = Papa.unparse(memories);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "memories.csv";
    link.click();
  };

  return (
    <>
      {/* Large screen sidebar */}
      <div className="w-64 h-full bg-gray-800 text-white p-6 space-y-6 hidden sm:block">
        {/* Add Memory */}
        <div className={listItemClass} onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Memory
        </div>

        {/* Categories Toggle */}
        <div>
          <div
            className={`${listItemClass} justify-between`}
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <span className="flex items-center gap-2">
              <FaList /> Categories
            </span>
            <span>{isCategoriesOpen ? "−" : "+"}</span>
          </div>

          {isCategoriesOpen && (
            <ul className="mt-2 space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={listItemClass}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Export */}
        <div className={listItemClass} onClick={handleExport}>
          <FaFileExport /> Export
        </div>
      </div>

      {/* Bottom navigation for smaller screens */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-10 shadow-md">
        <button className={listItemClass} onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Memory
        </button>

        <button
          className={listItemClass}
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          <FaList /> Categories
        </button>

        <button className={listItemClass} onClick={handleExport}>
          <FaFileExport /> Export
        </button>

        {/* Category Toggle for Small Screen */}
        {isCategoriesOpen && (
          <div className="absolute bottom-16 left-0 right-0 bg-gray-800 text-white p-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={listItemClass}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
