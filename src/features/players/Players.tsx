import { useGetPlayersQuery } from "./playersApiSlice";
import Player from "./Player";

interface PlayerProps {
  id: number;
  name: string;
  username: string;
  email: string;
  number: string;
  position: string;
}

const Players = () => {
  const { data: players, isLoading, error } = useGetPlayersQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-solid border-gray-300 w-full m-10">
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
            <button className="flex items-center justify-center bg-blue-700 text-white px-2 py-1 rounded-md" style={{ width: '133px', height: '40px' }}>
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
            {players?.map((player: PlayerProps) => (
              <Player key={player.id} player={player} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
