import { useState } from "react";
import {
  useGetTeamsQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} from "./teamsApiSlice";
import { useGetPlayersQuery } from "../players/playersApiSlice";

interface TeamProps {
  id: number;
  name: string;
  players: {
    id: number;
    name: string;
    username: string;
    email: string;
    number: string;
  }[];
}

const Teams = () => {
  const {
    data: teams,
    isLoading: isTeamsLoading,
    error: teamsError,
  } = useGetTeamsQuery({});
  const {
    data: players,
    isLoading: isPlayersLoading,
    error: playersError,
  } = useGetPlayersQuery({});
  
  const [addTeam] = useAddTeamMutation();
  const [editTeam] = useEditTeamMutation();
  const [deleteTeam, { isLoading: isDeletingTeam }] = useDeleteTeamMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamDetails, setTeamDetails] = useState<TeamProps>({
    id: 0,
    name: "",
    players: [],
  });

  const openModal = (team: TeamProps | null = null) => {
    setIsModalOpen(true);
    setIsAddingTeam(!team);
    setIsEditing(!!team);
    setTeamDetails(
      team || {
        id: 0,
        name: "",
        players: [],
      }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddingTeam(false);
    setIsEditing(false);
    setTeamDetails({
      id: 0,
      name: "",
      players: [],
    });
  };

  const saveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isAddingTeam) {
      await addTeam({
        name: teamDetails.name,
        playerIds: teamDetails.players.map((player) => player.id),
      }).unwrap();
    } else if (isEditing) {
      await editTeam({
        id: teamDetails.id,
        name: teamDetails.name,
        playerIds: teamDetails.players.map((player) => player.id),
      }).unwrap();
    }
  
    closeModal();
  };  

  const deleteTeamById = (teamId: number) => {
    deleteTeam(teamId);
  };

  if (isTeamsLoading || isPlayersLoading) {
    return <div>Loading teams and players...</div>;
  }

  if (teamsError || playersError) {
    return <div>Error</div>;
  }

  return (
    <div className='bg-white rounded-xl border border-solid border-gray-300 w-full m-10 pb-2'>
      <div>
        <div className='flex justify-between items-center p-4' style={{borderBottom: "1px solid #e5e7eb"}}>
          <div className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-4'>
              <h2 className='text-lg font-bold'>All Teams</h2>
              <div
                className='flex items-center bg-blue-100 text-blue-700 font-semibold justify-center border-2 border-blue-300 rounded-full px-2 py-1'
                style={{ width: "74px", height: "22px", fontSize: "12px" }}
              >
                <span>{teams.length}</span>
                <span className='ml-1'>
                  {teams.length === 1 ? "Team" : "Teams"}
                </span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2 ml-auto'>
            <button
              className='flex items-center justify-center bg-blue-700 text-white px-2 py-1 rounded-md'
              style={{ width: "133px", height: "40px" }}
              onClick={() => openModal()}
            >
              <img
                src='/assets/icons/WhiteAddIcon.png'
                alt='Add Icon'
                className='w-4 h-4 mr-1'
              />
              <span>Add Team</span>
            </button>
          </div>
        </div>

        <table className='w-full'>
          <thead className='h-11 bg-gray-100' style={{borderBottom: "1px solid #e5e7eb"}}>
            <tr>
              <th className='w-1/6 text-left pl-4'>Team Name</th>
              <th className='w-3/6 text-left pl-4'>Players</th>
              <th className='w-1/6 text-left'></th>
              <th className='w-1/6 text-left'></th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <button
                    onClick={() => openModal()}
                    className='flex text-center pt-5 pb-2 pl-5 justify-center items-center'
                  >
                    <img
                      src='/assets/icons/AddButtonDottedOutline.png'
                      alt='Add Icon'
                      className='mr-2'
                      width={25}
                      height={25}
                    />
                    <p className='text-sm bg-white'>Add team</p>
                  </button>
                </td>
              </tr>
            ) : (
              teams.map((team: TeamProps) => (
                <tr
                  key={team.id}
                  className='h-16 border-t border-gray-300 bg-white'
                >
                  <td className='w-2/12 text-left pl-4'>{team.name}</td>
                  <td className='w-7/12 text-left pl-4'>
                    {team.players.map((player, index) => (
                      <span key={player.id}>
                        {player.name}
                        {index !== team.players.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className='text-right'>
                    <button onClick={() => openModal(team)}>
                      <img
                        src='/assets/icons/EditIcon.png'
                        alt='Edit Icon'
                        width={17}
                        height={17}
                      />
                    </button>
                  </td>
                  <td className='text-right pr-5'>
                    <button
                      onClick={() => deleteTeamById(team.id)}
                      disabled={isDeletingTeam}
                    >
                      <img
                        src='/assets/icons/DeleteIcon.png'
                        alt='Delete Icon'
                        width={17}
                        height={17}
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div
      className='bg-white rounded-lg p-6 overflow-y-auto'
      style={{ width: "544px", height: "480px" }}
    >
      <span
        className='close'
        onClick={closeModal}
        style={{ float: "right", cursor: "pointer" }}
      >
        &times;
      </span>
      <form onSubmit={saveTeam}>
        <h2 className='text-xl font-bold mb-6 text-center'>
          {isEditing ? "Edit Team" : "Add Team"}
        </h2>
        <input
          type='text'
          placeholder='Enter team name'
          value={teamDetails.name}
          onChange={(e) =>
            setTeamDetails((prevTeamDetails) => ({
              ...prevTeamDetails,
              name: e.target.value,
            }))
          }
          className='border border-gray-300 rounded-md px-2 py-1 w-full mb-4'
        />
        <h3>Players:</h3>
        {players.map((player: { id: number; name: string }) => (
          <div key={player.id} className='mb-2'>
            <input
              type='checkbox'
              id={`player-${player.id}`}
              value={player.id.toString()}
              checked={teamDetails.players.some((p) => p.id === player.id)}
              onChange={(e) => {
                const player = players.find(
                  (p: { id: number; name: string }) => p.id.toString() === e.target.value
                );
                if (player) {
                  if (e.target.checked) {
                    setTeamDetails((prevTeamDetails) => ({
                      ...prevTeamDetails,
                      players: [...prevTeamDetails.players, player],
                    }));
                  } else {
                    setTeamDetails((prevTeamDetails) => ({
                      ...prevTeamDetails,
                      players: prevTeamDetails.players.filter(
                        (p) => p.id !== player.id
                      ),
                    }));
                  }
                }
              }}
            />
            <label htmlFor={`player-${player.id}`} className='ml-2'>
              {player.name}
            </label>
          </div>
        ))}
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-700 text-white font-semibold px-4 py-2 rounded-md mr-2'
          >
            {isEditing ? "Save Changes" : "Add Team"}
          </button>
          <button
            type='button'
            onClick={closeModal}
            className='bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Teams;
