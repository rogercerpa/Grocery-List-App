import React from "react";

const ActionButton = ({ label, className, onClick }) => {
  return (
    <button
      className={`flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
