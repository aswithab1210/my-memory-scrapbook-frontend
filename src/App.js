import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MemoryCard from "./components/MemoryCard";
import AddMemoryForm from "./components/AddMemoryForm";
import Papa from "papaparse";
import axios from "axios";

const App = () => {
  const [memories, setMemories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editMemoryId, setEditMemoryId] = useState(null);

  // ✅ API base URL for Netlify Function
  const apiBase = "/.netlify/functions/models/memory";

  // Fetch memories on mount
  useEffect(() => {
    axios
      .get(apiBase)
      .then((response) => {
        setMemories(response.data);
      })
      .catch((err) => {
        console.error("Error fetching memories:", err);
      });
  }, []);

  // Handle Sidebar category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "All Categories" ? "" : category);
  };

  // Add or Edit Memory
  const handleAddMemory = (memory) => {
    if (editMemoryId) {
      // PUT request for updating an existing memory
      axios
        .put(`${apiBase}/${editMemoryId}`, memory)
        .then((response) => {
          const updatedMemory = response.data;
          setMemories((prev) =>
            prev.map((item) =>
              item._id === updatedMemory._id ? updatedMemory : item
            )
          );
        })
        .catch((err) => console.error("Error updating memory:", err));
    } else {
      // POST request for adding a new memory
      axios
        .post(apiBase, memory)
        .then((response) => {
          setMemories((prev) => [...prev, response.data]);
        })
        .catch((err) => console.error("Error adding memory:", err));
    }
  
    setIsModalOpen(false);
    setEditMemoryId(null);
  };
  

  // Start editing memory
  const handleEdit = (id) => {
    const memoryToEdit = memories.find((memory) => memory._id === id);
    if (memoryToEdit) {
      setEditMemoryId(id);
      setIsModalOpen(true);
    }
  };

  // Delete memory
  const handleDelete = (id) => {
    axios
      .delete(`${apiBase}/${id}`)
      .then(() => {
        setMemories((prev) => prev.filter((memory) => memory._id !== id));
      })
      .catch((err) => console.error("Error deleting memory:", err));
  };

  // Export all memories to CSV
  const handleExport = () => {
    const memoriesToExport = memories.map(
      ({ title, description, category, date }) => ({
        title,
        description,
        category,
        date,
      })
    );

    const csv = Papa.unparse(memoriesToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "memories.csv";
    link.click();
  };

  // Filter by category if selected
  const filteredMemories = selectedCategory
    ? memories.filter((memory) => memory.category === selectedCategory)
    : memories;

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Memory Scrapbook</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, User!</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 pt-16 pb-16 sm:pb-0">
        {/* Sidebar */}
        <Sidebar
          onCategoryChange={handleCategoryChange}
          setIsModalOpen={setIsModalOpen}
          handleExport={handleExport}
          memories={memories}
        />

        {/* Memory Display */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex justify-center sm:justify-start sm:items-start items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {filteredMemories.map((memory) => (
              <MemoryCard
                key={memory._id}
                memory={memory}
                onEdit={() => handleEdit(memory._id)}
                onDelete={() => handleDelete(memory._id)}
              />
            ))}
          </div>

          {/* Modal for Add/Edit */}
          {isModalOpen && (
            <AddMemoryForm
              onSave={handleAddMemory}
              onClose={() => {
                setIsModalOpen(false);
                setEditMemoryId(null);
              }}
              editMemoryId={editMemoryId}
              memories={memories}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
