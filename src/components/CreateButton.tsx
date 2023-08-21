import React, { useState } from "react";

type CreateButtonProps = {
  text: string;
  onClick: () => void;
};

const CreateButton = ({ text, onClick }: CreateButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{ borderWidth: "1px" }}
      className='flex items-center py-2 px-4 border-blue-700 rounded-lg hover:bg-blue-700'
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <img
          src={`/assets/icons/AddIcon_${isHovered ? 'white' : 'blue'}.svg`}
          alt='Add Icon'
          width={12}
          height={12}
        />
      <span className='ml-2 font-bold text-sm text-blue-700 hover:text-white'>
        {text}
      </span>
    </div>
  );
};

export default CreateButton;
