import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className="border-gray-600 rounded-lg p-4 bg-blue-100 hover:shadow-xl transition-all ease-in-out duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-base font-semibold text-slate-800">{title}</h6>
                    <span className="text-xs text-slate-500">{date}</span>
                </div>

                <MdOutlinePushPin 
                    className={`cursor-pointer text-lg sm:text-xl transition-colors ${
                        isPinned ? 'text-blue-500' : 'text-slate-400 hover:text-blue-400'
                    }`}
                    onClick={onPinNote}
                />
            </div>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {content?.slice(0, 100)}...
            </p>

            <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                    {tags}
                </div>

                <div className="flex items-center gap-3">
                    <MdCreate 
                        className="cursor-pointer text-lg sm:text-xl text-green-500 hover:text-green-600 transition-colors" 
                        onClick={onEdit} 
                    />
                    <MdDelete 
                        className="cursor-pointer text-lg sm:text-xl text-red-500 hover:text-red-600 transition-colors" 
                        onClick={onDelete} 
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
