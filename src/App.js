// src/App.js
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

  useEffect(() => {
    axios
      .get("/.netlify/functions/getMemory")
      .then((res) => setMemories(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "All Categories" ? "" : category);
  };

  const handleAddMemory = (memory) => {
    if (editMemoryId) {
      axios
        .put(`/.netlify/functions/editMemory/${editMemoryId}`, memory)
        .then((res) => {
          const updated = res.data;
          setMemories((prev) =>
            prev.map((m) => (m._id === updated._id ? updated : m))
          );
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      axios
        .post("/.netlify/functions/addMemory", memory)
        .then((res) => setMemories((prev) => [...prev, res.data]))
        .catch((err) => console.error("Add error:", err));
    }

    setIsModalOpen(false);
    setEditMemoryId(null);
  };

  const handleEdit = (id) => {
    setEditMemoryId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/.netlify/functions/deleteMemory/${id}`)
      .then(() =>
        setMemories((prev) => prev.filter((memory) => memory._id !== id))
      )
      .catch((err) => console.error("Delete error:", err));
  };

  const filteredMemories = selectedCategory
    ? memories.filter((m) => m.category === selectedCategory)
    : memories;

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 z-10 shadow-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Memory Scrapbook</h1>
          <span className="text-gray-300">Welcome, User!</span>
        </div>
      </div>

      <div className="flex flex-1 pt-16 pb-16 sm:pb-0">
        <Sidebar
          onCategoryChange={handleCategoryChange}
          setIsModalOpen={setIsModalOpen}
          memories={memories}
        />

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
