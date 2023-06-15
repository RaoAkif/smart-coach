import React from "react";

interface PlayerProps {
  id: number;
  name: string;
  username: string;
  email: string;
  number: string;
  position: string;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <tr className="p-4 border-b-2 border-gray-300 bg-white">
      <td className="w-1/6 text-left pl-4 h-16">{player.name}</td>
      <td className="w-1/6 text-left pl-4 h-16">{player.position}</td>
      <td className="w-1/6 text-left pl-4 h-16">{player.email}</td>
      <td className="w-1/6 text-left pl-4 h-16">{player.number}</td>
      <td className="w-1/6 text-left pl-4 h-16">
        <button className="flex mt-2 bg-white border border-solid border-blue-700 text-blue-700 rounded-md justify-center items-center gap-1 px-2 py-1" style={{ width: '86px', height: '36px' }}>
          <img
            src="/assets/icons/EyeIcon.png"
            alt="Options Icon"
            width={17}
            height={17}
          />
          <span className="text-sm">View</span>
        </button>
      </td>
      <td>
        {/* Edit button */}
        <button className="text-blue-700">
          <img
            src="/assets/icons/EditIcon.png"
            alt="Options Icon"
            width={17}
            height={17}
          />
        </button>
      </td>
      <td>
        {/* Delete button */}
        <button className="text-blue-700">
          <img
            src="/assets/icons/DeleteIcon.png"
            alt="Options Icon"
            width={17}
            height={17}
          />
        </button>
      </td>
    </tr>
  );
};

export default Player;
