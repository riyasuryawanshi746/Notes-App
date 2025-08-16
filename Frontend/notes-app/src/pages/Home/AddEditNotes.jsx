import React, { useState } from 'react';
import TagInput from '../Input/TagInput';
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      // Your API call logic here
      console.log("Adding note:", { title, content, tags });
      getAllNotes();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit Note  
  const editNote = async () => {
    try {
      // Your API call logic here
      console.log("Editing note:", { title, content, tags });
      getAllNotes();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {type === "edit" ? "Update Note" : "Add New Note"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          <MdClose />
        </button>
      </div>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
            TITLE
          </label>
          <input
            type="text"
            placeholder="Go To Gym At 5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
            CONTENT
          </label>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
          />
        </div>

        {/* Tags Input */}
        <TagInput tags={tags} setTags={setTags} />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Add Button */}
        <button
          onClick={handleAddNote}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide text-lg"
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;