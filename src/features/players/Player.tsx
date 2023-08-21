import React from "react";
import { useDeletePlayerMutation } from "./playersApiSlice";

interface PlayerProps {
  player: {
    id: number;
    name: string;
    username: string;
    email: string;
    number: string;
    position:
      | "GOAL_KEEPER"
      | "FULL_BACK_RIGHT"
      | "FULL_BACK_LEFT"
      | "CENTRE_BACK"
      | "SWEEPER"
      | "DEFENSIVE_MIDFIELD_RIGHT"
      | "DEFENSIVE_MIDFIELD_LEFT"
      | "SECOND_STRIKER"
      | "CENTRE_FORWARD";
  };
  openModal: (playerId: number) => void;
  isEditing: boolean;
  deletePlayer: (id: number) => void; // Add the deletePlayer prop
  isDeletingPlayer: boolean; // Add the isDeletingPlayer prop
}

const Player: React.FC<PlayerProps> = ({ player, openModal }) => {
  const [deletePlayer] = useDeletePlayerMutation();
  
  const handleDelete = () => {
    deletePlayer(player.id)
      .unwrap()
      .then((response) => {
        console.log("Player deleted successfully:", response);
      })
      .catch((error) => {
        console.error("Error deleting player:", error);
      });
  };
  
  return (
    <tr className="p-4 border-t border-gray-300 bg-white">
      <td className="w-1/6 text-left pl-4 h-16">{player.name}</td>
      <td className="w-1/6 text-left pl-4 h-16">{player.position}</td>
      <td className="w-1/6 text-left pl-4 h-16">{player.email}</td>
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
        <button
          className="text-blue-700"
          onClick={() => openModal(player.id)}
        >
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
        <button className="text-blue-700" onClick={handleDelete}>
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
