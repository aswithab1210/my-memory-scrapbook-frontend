import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [tags, setTags] = useState('');

  const handleChange = (e) => {
    setTags(e.target.value);
    onFilterChange({ category: '', tags: e.target.value });
  };

  return (
    <input
      type="text"
      placeholder="Filter by tags..."
      value={tags}
      onChange={handleChange}
      className="w-full px-3 py-2 rounded bg-gray-700 text-white mt-4"
    />
  );
};

export default Filter;
