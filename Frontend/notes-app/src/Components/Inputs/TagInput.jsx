import React, { useState } from 'react';
import { MdClose, MdAdd } from 'react-icons/md';

const TagInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddClick = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
        TAGS
      </label>
      
      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium"
          >
            #{tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-blue-600 hover:text-blue-800 ml-1"
              type="button"
            >
              <MdClose size={16} />
            </button>
          </span>
        ))}
      </div>

      {/* Input with Add Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add tags"
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
        >
          <MdAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;