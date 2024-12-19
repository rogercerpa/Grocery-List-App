import React from "react";

const Tooltip = ({ children, content }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bottom-0 bg-gray-700 text-white text-xs rounded py-1 px-2 
                opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out whitespace-nowrap"
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
