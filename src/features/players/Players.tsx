import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayers } from "./playersSlice"; // Import the setPlayers action
import {
  useGetPlayersQuery,
  useAddPlayerMutation,
  useEditPlayerMutation,
  useDeletePlayerMutation,
} from "./playersApiSlice";

interface PlayerProps {
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
  availability_status: string;
}

const Players: React.FC = () => {
  const { data: playersData, isLoading, error } = useGetPlayersQuery({});
  const players = useSelector((state) => state.players);

  const dispatch = useDispatch();

const [addPlayer] = useAddPlayerMutation({
  onSuccess: (newPlayer) => {
    // Update the Redux store's players array
    const updatedPlayers = [...players, newPlayer];
    dispatch(setPlayers(updatedPlayers));
  },
});

  const [editPlayer] = useEditPlayerMutation();
  const [deletePlayer, { isLoading: isDeletingPlayer }] =
    useDeletePlayerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [playerDetails, setPlayerDetails] = useState<PlayerProps>({
    id: 0,
    name: "",
    username: "",
    email: "",
    number: "",
    position: "GOAL_KEEPER",
    availability_status: "PENDING",
  });

  const openModal = (playerId?: number) => {
    setIsModalOpen(true);
    setEditingPlayerId(playerId || null);
    setIsEditing(Boolean(playerId));
    const player = playersData?.find(
      (player: PlayerProps) => player.id === playerId
    );
    if (player) {
      setPlayerDetails(player);
    } else {
      setPlayerDetails({
        id: 0,
        name: "",
        username: "",
        email: "",
        number: "",
        position: "GOAL_KEEPER",
        availability_status: "PENDING",
      });
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
      position: "GOAL_KEEPER",
      availability_status: "PENDING",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingPlayerId) {
      editPlayer({ ...playerDetails })
        .unwrap()
        .then((response) => {
          console.log("Player updated successfully:", response);
          const updatedPlayers = playersData.map((player) =>
            player.id === playerDetails.id ? response : player
          );
          dispatch(setPlayers(updatedPlayers));
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating player:", error);
        });
    } else {
      setIsAddingPlayer(true);

      addPlayer(playerDetails)
        .unwrap()
        .then((response) => {
          console.log("Player added successfully:", response);
          closeModal();
        })
        .catch((error) => {
          console.error("Error adding player:", error);
        })
        .finally(() => {
          setIsAddingPlayer(false);
        });
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlayerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className='loading-spinner-container'>
        {/* Your loading spinner JSX */}
      </div>
    );
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <div className='bg-white rounded-xl border border-solid border-gray-300 w-full m-10 pb-2'>
      <div>
        <div
          className='flex justify-between items-center p-4'
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <div className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-4'>
              <h2 className='text-lg font-bold'>All Players</h2>
              <div
                className='flex items-center bg-blue-100 text-blue-700 font-semibold justify-center border-2 border-blue-300 rounded-full px-2 py-1'
                style={{
                  width: "74px",
                  height: "22px",
                  fontSize: "12px",
                  borderWidth: "1px",
                }}
              >
                <span className=' mt-1'>{playersData.length}</span>
                <span className='ml-1 mt-1'>
                  {playersData.length === 1 ? "Player" : "Players"}
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
              <span>Add Player</span>
            </button>
          </div>
        </div>

        <table className='w-full'>
          <thead
            className='h-11 bg-gray-100 text-gray-600'
            style={{ borderBottom: "1px solid #e5e7eb", background: "#f7f7f8" }}
          >
            <tr>
              <th className='w-1/6 text-left pl-4 text-sm font-medium'>Name</th>
              <th className='w-1/6 text-left pl-4 text-sm font-medium'>
                Position
              </th>
              <th className='w-1/6 text-left pl-4 text-sm font-medium'>
                Email
              </th>
              <th className='w-1/12 text-left pl-4 text-sm font-medium'>
                Login details
              </th>
              <th className='w-1/12' colSpan={2}></th>
              {/* Empty space for edit and delete columns */}
            </tr>
          </thead>
          <tbody>
            {playersData.length === 0 ? (
              <tr>
                <td colSpan={6}>
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
                    <p className='text-sm bg-white'>Add player</p>
                  </button>
                </td>
              </tr>
            ) : (
              <>
                {playersData.map((player: PlayerProps) => (
                  <tr
                    className='p-4 border-t border-gray-300 bg-white'
                    key={player.id}
                  >
                    <td className='w-1/6 text-left pl-4 h-16 font-medium text-black'>
                      {player.name}{" "}
                      <span className='text-gray-600 font-normal'>
                        &nbsp;@{player.username}
                      </span>
                    </td>
                    <td className='w-2/12 text-left pl-4 h-16 text-gray-600 font-normal'>
                      {player.position}
                    </td>
                    <td className='w-1/6 text-left pl-4 h-16 text-gray-600 font-normal'>
                      {player.email}
                    </td>
                    <td className='w-1/12 text-left pl-4 h-16'>
                      <button
                        className='flex bg-white border border-solid border-blue-700 text-blue-700 rounded-md justify-center items-center gap-1 px-2 py-1'
                        style={{ width: "86px", height: "36px" }}
                      >
                        <img
                          src='/assets/icons/EyeIcon.png'
                          alt='Options Icon'
                          width={17}
                          height={17}
                        />
                        <span className='text-sm'>View</span>
                      </button>
                    </td>
                    <td>
                      {/* Edit button */}
                      <button
                        className='text-blue-700'
                        style={{ marginTop: "10px" }}
                        onClick={() => openModal(player.id)} // Pass player ID to openModal function
                      >
                        <img
                          src='/assets/icons/EditIcon.png'
                          alt='Options Icon'
                          width={17}
                          height={17}
                        />
                      </button>
                    </td>
                    <td>
                      {/* Delete button */}
                      <button
                        className='text-blue-700'
                        style={{ marginTop: "10px" }}
                        onClick={() => {
                          deletePlayer(player.id)
                            .unwrap()
                            .then(() => {
                              const updatedPlayers = players.filter(
                                (p) => p.id !== player.id
                              );
                              dispatch(setPlayers(updatedPlayers));
                            })
                            .catch((error) => {
                              console.error("Error deleting player:", error);
                            });
                        }}
                        disabled={isDeletingPlayer}
                      >
                        <img
                          src='/assets/icons/DeleteIcon.png'
                          alt='Options Icon'
                          width={17}
                          height={17}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            className='bg-white rounded-lg p-6 overflow-y-auto'
            style={{ width: '60%', height: "70%" }}
          >
            <h2 className='text-xl font-bold mb-6 text-center'>
              {isEditing ? "Edit Player Details" : "Add Player Details"}
            </h2>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                id='name'
                name='name'
                className='border border-gray-300 rounded-md px-2 py-1 w-full'
                placeholder='Adrian Dubler'
                value={playerDetails.name}
                onChange={handleChange}
              />
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                name='username'
                className='border border-gray-300 rounded-md px-2 py-1 w-full'
                placeholder='@adrian'
                value={playerDetails.username}
                onChange={handleChange}
              />

              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                className='border border-gray-300 rounded-md px-2 py-1 w-full'
                placeholder='adrian@gmail.com'
                value={playerDetails.email}
                onChange={handleChange}
              />

              <label htmlFor='number'>Phone Number</label>
              <input
                type='text'
                id='number'
                name='number'
                className='border border-gray-300 rounded-md px-2 py-1 w-full'
                placeholder='+1 234 567 890'
                value={playerDetails.number}
                onChange={handleChange}
              />

              <label htmlFor='position'>Position</label>
              <select
                id='position'
                name='position'
                className='border border-gray-300 rounded-md px-2 py-1 w-full'
                value={playerDetails.position}
                onChange={handleChange}
              >
                <option value=''>Select a position</option>
                <option value='GOAL_KEEPER'>GOAL_KEEPER</option>
                <option value='FULL_BACK_RIGHT'>FULL_BACK_RIGHT</option>
                <option value='FULL_BACK_LEFT'>FULL_BACK_LEFT</option>
                <option value='CENTRE_BACK'>CENTRE_BACK</option>
                <option value='SWEEPER'>SWEEPER</option>
                <option value='DEFENSIVE_MIDFIELD_RIGHT'>
                  DEFENSIVE_MIDFIELD_RIGHT
                </option>
                <option value='DEFENSIVE_MIDFIELD_LEFT'>
                  DEFENSIVE_MIDFIELD_LEFT
                </option>
                <option value='SECOND_STRIKER'>SECOND_STRIKER</option>
                <option value='CENTRE_FORWARD'>CENTRE_FORWARD</option>
              </select>
              <div className='flex justify-between'>
                <button
                  className='bg-white font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded-md w-5/12'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='bg-blue-700 text-white px-4 py-2 rounded-md w-5/12'
                  type='submit'
                >
                  {isEditing
                    ? "Update Player"
                    : isAddingPlayer
                    ? "Adding..."
                    : "Add Player"}
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
