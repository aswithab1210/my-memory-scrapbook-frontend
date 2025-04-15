import React, { useState } from "react";
import AddMemoryForm from "./AddMemoryForm";
import MemoryCard from "./MemoryCard";

const MemoryDashboard = () => {
  const [memories, setMemories] = useState([]);
  const [editMemoryId, setEditMemoryId] = useState(null);

  // Save new or updated memory
  const handleSave = (memory) => {
    if (editMemoryId) {
      setMemories(memories.map((m) => (m.id === memory.id ? memory : m)));
    } else {
      setMemories([...memories, { ...memory, id: Date.now() }]);
    }
    setEditMemoryId(null);
  };

  // Open the form with the selected memory data
  const handleEdit = (id) => {
    setEditMemoryId(id);
  };

  // Delete the memory
  const handleDelete = (id) => {
    setMemories(memories.filter((memory) => memory.id !== id));
  };

  // Close the form
  const handleClose = () => {
    setEditMemoryId(null);
  };

  return (
    <div>
      <h1>Memory Dashboard</h1>
      <div className="memory-cards">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editMemoryId && (
        <AddMemoryForm
          onSave={handleSave}
          onClose={handleClose}
          editMemoryId={editMemoryId}
          memories={memories}
        />
      )}
    </div>
  );
};

export default MemoryDashboard;
