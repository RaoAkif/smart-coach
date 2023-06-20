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
                <span className="ml-1">{teams.length === 1 ? "Team" : "Teams"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between border-b-2 border-solid border-gray-300 p-4">
              <div>
                <h3 className="text-lg font-bold">{team.name}</h3>
                <p>
                  Players: {team.players.map((player) => player.name).join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/teams/${team.id}`} className="text-blue-700 underline">
                  View
                </Link>
                <button className="text-red-700 underline" onClick={() => deleteTeamById(team.id)} disabled={isDeletingTeam}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{isAddingTeam ? "Add Team" : "Edit Team"}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Name:</label>
              <input type="text" className="border border-solid border-gray-300 px-3 py-2 rounded-md w-full" value={teamDetails.name} onChange={(e) => setTeamDetails({ ...teamDetails, name: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Players:</label>
              <input type="text" className="border border-solid border-gray-300 px-3 py-2 rounded-md w-full" value={teamDetails.players.map((player) => player.name).join(", ")} onChange={(e) => setTeamDetails({ ...teamDetails, players: e.target.value.split(", ") })} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Event:</label>
              <input
                type="text"
                className="border border-solid border-gray-300 px-3 py-2 rounded-md w-full"
                value={teamDetails.event.title}
                onChange={(e) => setTeamDetails({ ...teamDetails, event: { ...teamDetails.event, title: e.target.value } })}
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2" onClick={saveTeam}>
                Save
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-md" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
