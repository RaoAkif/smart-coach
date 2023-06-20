import { useState } from "react";
import { useGetTeamsQuery, useAddTeamMutation, useEditTeamMutation, useDeleteTeamMutation } from "./teamsApiSlice";
import { Link } from "react-router-dom";

interface TeamProps {
  id: number;
  name: string;
  players: { id: number; name: string; username: string; email: string; number: string }[];
}

const Teams = () => {
  const { data: teams, isLoading, error } = useGetTeamsQuery({});
  const [addTeam] = useAddTeamMutation();
  const [editTeam] = useEditTeamMutation();
  const [deleteTeam, { isLoading: isDeletingTeam }] = useDeleteTeamMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamDetails, setTeamDetails] = useState<TeamProps>({
    id: 0,
    name: "",
    players: []
  });

  console.log(teams);

  const openModal = (team: TeamProps | null = null) => {
    setIsModalOpen(true);
    setIsAddingTeam(!team);
    setIsEditing(!!team);
    setTeamDetails(
      team || {
        id: 0,
        name: "",
        players: []
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
      players: []
    });
  };

  const saveTeam = () => {
    if (isAddingTeam) {
      addTeam(teamDetails);
    } else if (isEditing) {
      editTeam({ teamDetails });
    }

    closeModal();
  };

  const deleteTeamById = (teamId: number) => {
    deleteTeam(teamId);
  };

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-solid border-gray-300 w-full m-10 pb-2">
      <div>
        <div className="flex justify-between items-center p-4 border-b-2 border-solid border-gray-300">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold">All Teams</h2>
              <div className="flex items-center bg-blue-100 text-blue-700 font-semibold justify-center border-2 border-blue-300 rounded-full px-2 py-1" style={{ width: "74px", height: "22px", fontSize: "12px" }}>
                <span>{teams.length}</span>
                <span className="ml-1">
                  {teams.length === 1 ? "Team" : "Teams"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center justify-center bg-blue-700 text-white px-2 py-1 rounded-md" style={{ width: '133px', height: '40px' }} onClick={() => openModal()}>
              <img src="/assets/icons/WhiteAddIcon.png" alt="Add Icon" className="w-4 h-4 mr-1" />
              <span>Add Team</span>
            </button>
          </div>
        </div>
        
        <table className="w-full">
  <thead className="h-11 border-b-2 bg-gray-100">
    <tr>
      <th className="w-1/6 text-left pl-4">Team Name</th>
      <th className="w-3/6 text-left pl-4">Players</th>
      <th className="w-1/6 text-left"></th>
      <th className="w-1/6 text-left"></th>
    </tr>
  </thead>
  <tbody>
    {teams.length === 0 ? (
      <tr>
        <td colSpan={4}>
          <button onClick={() => openModal()} className="flex text-center pt-5 pb-2 pl-5 justify-center items-center">
            <img
              src="/assets/icons/AddButtonDottedOutline.png"
              alt="Add Icon"
              className="mr-2"
              width={25}
              height={25}
            />
            <p className="text-sm bg-white">Add team</p>
          </button>
        </td>
      </tr>
    ) : (
      teams.map((team: TeamProps) => (
        <tr key={team.id} className="h-16 border-t border-gray-300 bg-white">
          <td className="w-2/12 text-left pl-4">{team.name}</td>
          <td className="w-7/12 text-left pl-4">
            {team.players.map((player, index) => (
              <span key={player.id}>
                {player.name}
                {index !== team.players.length - 1 && ", "}
              </span>
            ))}
          </td>
          <td className="text-right">
            <button
              onClick={() => openModal(team)}
            >
              <img
                src="/assets/icons/EditIcon.png"
                alt="Edit Icon"
                width={17}
                height={17}
              />
            </button>
          </td>
          <td className="text-right pr-5">
            <button
              onClick={() => deleteTeamById(team.id)}
              disabled={isDeletingTeam}
            >
              <img
                src="/assets/icons/DeleteIcon.png"
                alt="Delete Icon"
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
      </div>
  );
};

export default Teams;
