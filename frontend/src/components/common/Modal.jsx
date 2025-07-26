import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20  backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
