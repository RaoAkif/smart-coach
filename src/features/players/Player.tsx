import React from "react";

interface PlayerProps {
  player: {
    id: number;
    name: string;
    username: string;
    email: string;
    number: string;
    position: string;
  };
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div>
      <h3>{player.name}</h3>
      <p>Username: {player.username}</p>
      <p>Email: {player.email}</p>
      <p>Number: {player.number}</p>
      <p>Position: {player.position}</p>
      {/* Render other player details as needed */}
    </div>
  );
};

export default Player;
