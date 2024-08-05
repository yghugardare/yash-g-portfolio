"use client"
import React from 'react';
interface ViewResumeButtonProps {
    onClick: () => void;
  }
const ViewResumeButton = ({ onClick }:ViewResumeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#64FFDA] md:p-3 md:px-5 md:text-lg p-3 rounded-md text-bgColor font-bold text-sm font-mono`}
    >
      View Resume
    </button>
  );
};

export default ViewResumeButton;
