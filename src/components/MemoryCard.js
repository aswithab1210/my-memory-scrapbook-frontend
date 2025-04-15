import React from "react";

const MemoryCard = ({ memory, onEdit, onDelete }) => {
  // Check if memory object exists
  if (!memory) {
    return <div className="error">Memory not available</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-4 w-80 text-black hover:shadow-blue-500 transition-all duration-300 ease-in-out flex flex-col justify-between">
      {/* Display image if available */}
      {memory.image && (
        <img
          src={memory.image}
          alt={memory.title}
          className="rounded-lg mb-3 object-cover h-40 w-full"
        />
      )}

      {/* Display memory title */}
      <h3 className="text-xl font-bold mb-1">{memory.title}</h3>

      {/* Display memory description */}
      <p className="text-gray-200 text-sm mb-2">{memory.description}</p>

      {/* Display memory category */}
      <span className="text-xs uppercase tracking-wider bg-blue-500 text-white px-2 py-1 rounded-full mb-3 self-start">
        {memory.category}
      </span>

      {/* Action buttons for edit and delete */}
      <div className="flex justify-end gap-3 mt-auto">
        <button
          onClick={() => onEdit(memory.id)} /* Pass memory ID to onEdit */
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(memory.id)} /* Pass memory ID to onDelete */
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;
