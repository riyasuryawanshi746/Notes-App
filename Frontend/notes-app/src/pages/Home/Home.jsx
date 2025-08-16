import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import NoteCard from "../../Components/Cards/NoteCard";
import TagInput from "../../Components/Inputs/TagInput";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root"); // accessibility

const Home = () => {
  const [notes, setNotes] = useState([
    {
      title: "Meeting on 7th April",
      date: "3rd Apr 2024",
      content: "Meeting is important and mandatory attendance, it should be above 75%",
      tags: ["Meetings"],
      isPinned: true,
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    date: "",
    content: "",
    tags: [],
    isPinned: false,
  });

  const handleAddNote = () => {
    // Validation
    if (!newNote.title.trim()) {
      setError("Please enter the title");
      return;
    }
    if (!newNote.content.trim()) {
      setError("Please enter the content");
      return;
    }
    if (!newNote.date) {
      setError("Please select a date");
      return;
    }

    setError("");
    setNotes([...notes, newNote]);
    setNewNote({ title: "", date: "", content: "", tags: [], isPinned: false });
    setModalIsOpen(false);
  };

  return (
    <>
      <Navbar />

      {/* Notes grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {notes.map((note, idx) => (
            <NoteCard
              key={idx}
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setModalIsOpen(true)}
        className="fixed w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 bottom-8 right-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MdAdd className="text-3xl text-white" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-0 outline-none"
        overlayClassName="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Note</h2>
            <button
              onClick={() => setModalIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <input
              type="date"
              value={newNote.date}
              onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                CONTENT
              </label>
              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>
            
            <TagInput 
              tags={newNote.tags} 
              setTags={(tags) => setNewNote({ ...newNote, tags })} 
            />
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newNote.isPinned}
                onChange={(e) => setNewNote({ ...newNote, isPinned: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Pin this note</span>
            </label>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNote}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wide"
            >
              ADD
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;