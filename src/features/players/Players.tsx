import { useState } from "react";
import { useGetPlayersQuery, useAddPlayerMutation, useEditPlayerMutation, useDeletePlayerMutation } from "./playersApiSlice";
import Player from "./Player";

interface PlayerProps {
  player: {
    id: number;
    name: string;
    username: string;
    email: string;
    number: string;
    position: "GOAL_KEEPER" | "FULL_BACK_RIGHT" | "FULL_BACK_LEFT" | "CENTRE_BACK" | "SWEEPER" | "DEFENSIVE_MIDFIELD_RIGHT" | "DEFENSIVE_MIDFIELD_LEFT" | "SECOND_STRIKER" | "CENTRE_FORWARD";
  };
  openModal: (playerId: number) => void;
  isEditing: boolean;
  deletePlayer: (id: number) => void; // Add the deletePlayer prop
  isDeletingPlayer: boolean; // Add the isDeletingPlayer prop
}

const Players = () => {
  const { data: players, isLoading, error } = useGetPlayersQuery({});
  const [addPlayer, { isLoading: isAddingPlayer, isError }] = useAddPlayerMutation();
  const [editPlayer, { isLoading: isEditingPlayer }] = useEditPlayerMutation();
  const [deletePlayer, { isLoading: isDeletingPlayer }] = useDeletePlayerMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [playerDetails, setPlayerDetails] = useState<PlayerProps>({
    id: "",
    name: "",
    username: "",
    email: "",
    number: "",
    position: "",
    availability_status: "PENDING"
  });

  const openModal = (playerId: number) => {
    setIsModalOpen(true);
    setEditingPlayerId(playerId);
    setIsEditing(true);
    const player = players.find((player) => player.id === playerId);
    if (player) {
      setPlayerDetails(player);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingPlayerId(null);
    setPlayerDetails({
      id: 0,
      name: "",
      username: "",
      email: "",
      number: "",
      position: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingPlayerId) {
      editPlayer({ id: editingPlayerId, ...playerDetails })
        .unwrap()
        .then((response) => {
          console.log("Player updated successfully:", response);
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating player:", error);
        });
    } else if (player.id) {
      deletePlayer(player.id)
        .unwrap()
        .then((response) => {
          console.log("Player deleted successfully:", response);
        })
        .catch((error) => {
          console.error("Error deleting player:", error);
        });    
    } else {
      addPlayer(playerDetails)
        .unwrap()
        .then((response) => {
          console.log("Player added successfully:", response);
          closeModal();
        })
        .catch((error) => {
          console.error("Error adding player:", error);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlayerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-solid border-gray-300 w-full m-10 pb-2">
      <div>
        <div className="flex justify-between items-center p-4 border-b-2 border-solid border-gray-300">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold">All Players</h2>
              <div className="flex items-center bg-blue-100 text-blue-700 font-semibold justify-center border-2 border-blue-300 rounded-full px-2 py-1" style={{ width: '74px', height: '22px', fontSize: '12px' }}>
                <span>{players.length}</span>
                <span className="ml-1">
                  {players.length === 1 ? 'Player' : 'Players'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center justify-center bg-blue-700 text-white px-2 py-1 rounded-md" style={{ width: '133px', height: '40px' }} onClick={openModal}>
              <img src="/assets/icons/WhiteAddIcon.png" alt="Add Icon" className="w-4 h-4 mr-1" />
              <span>Add Player</span>
            </button>
          </div>
        </div>

        <table className="bg-gray-100 w-full">
          <thead className="h-11 border-b-2 border-gray-300">
            <tr>
              <th className="w-1/6 text-left pl-4">Name</th>
              <th className="w-1/6 text-left pl-4">Position</th>
              <th className="w-1/6 text-left pl-4">Email</th>
              <th className="w-1/6 text-left pl-4">Mobile</th>
              <th className="w-1/6 text-left pl-4">Login Details</th>
              <th className="w-1/12" colSpan={2}></th> {/* Empty space for edit and delete columns */}
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center flex">
                  <button onClick={openModal}>
                    <img
                      src="/assets/icons/AddButtonDottedOutline.png"
                      alt="Add Icon"
                      className="w-4 h-4 mr-1"
                    />
                  </button>
                  <div>Add player</div>
                </td>
              </tr>
            ) : (
              players.map((player: PlayerProps) => (
                <Player
                  key={player.id}
                  player={player}
                  openModal={openModal}
                  isEditing={isEditing}
                  deletePlayer={deletePlayer} // Pass the deletePlayer function
                  isDeletingPlayer={isDeletingPlayer} // Pass the isDeletingPlayer variable
                />
              ))              
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 overflow-y-auto" style={{ width: '544px', height: '480px' }}>
            <h2 className="text-xl font-bold mb-6 text-center">
              {isEditing ? "Edit Player Details" : "Add Player Details"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                placeholder="Adrian Dubler"
                value={playerDetails.name}
                onChange={handleChange}
              />
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" className="border border-gray-300 rounded-md px-2 py-1 w-full" placeholder="@adrian" value={playerDetails.username} onChange={handleChange} />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="border border-gray-300 rounded-md px-2 py-1 w-full" placeholder="adrian@gmail.com" value={playerDetails.email} onChange={handleChange} />

              <label htmlFor="number">Phone Number</label>
              <input type="text" id="number" name="number" className="border border-gray-300 rounded-md px-2 py-1 w-full" placeholder="+1 234 567 890" value={playerDetails.number} onChange={handleChange} />

              <label htmlFor="position">Position</label>
              <select id="position" name="position" className="border border-gray-300 rounded-md px-2 py-1 w-full" value={playerDetails.position} onChange={handleChange}>
                <option value="">Select a position</option>
                <option value="GOAL_KEEPER">GOAL_KEEPER</option>
                <option value="FULL_BACK_RIGHT">FULL_BACK_RIGHT</option>
                <option value="FULL_BACK_LEFT">FULL_BACK_LEFT</option>
                <option value="CENTRE_BACK">CENTRE_BACK</option>
                <option value="SWEEPER">SWEEPER</option>
                <option value="DEFENSIVE_MIDFIELD_RIGHT">DEFENSIVE_MIDFIELD_RIGHT</option>
                <option value="DEFENSIVE_MIDFIELD_LEFT">DEFENSIVE_MIDFIELD_LEFT</option>
                <option value="SECOND_STRIKER">SECOND_STRIKER</option>
                <option value="CENTRE_FORWARD">CENTRE_FORWARD</option>
              </select>
              <div className="flex justify-between">
                <button className="bg-white font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded-md w-5/12" onClick={closeModal}>Cancel</button>
                <button className="bg-blue-700 text-white px-4 py-2 rounded-md w-5/12" type="submit">
                  {isEditing ? "Update Player" : isAddingPlayer ? "Adding..." : "Add Player"}
                </button>
              </div>
            </form>

            {/* Modal content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
