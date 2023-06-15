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
    <div>
      {players?.map((player: PlayerProps) => (
        <Player key={player.id} player={player} />
      ))}
    </div>
  );
};

export default Players;
