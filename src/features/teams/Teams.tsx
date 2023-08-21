import { useState } from "react";
import {
  useGetTeamsQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} from "./teamsApiSlice";
import { useGetPlayersQuery } from "../players/playersApiSlice";

export interface TeamProps {
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
  const teamsData = [
    {
      id: 1,
      name: "Karachi Lions",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 2,
      name: "Lahore Tigers",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 3,
      name: "Islamabad Eagles",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 4,
      name: "Rawalpindi Panthers",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 5,
      name: "Faisalabad Bears",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 6,
      name: "Multan Wolves",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 7,
      name: "Peshawar Falcons",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 8,
      name: "Quetta Hawks",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 9,
      name: "Gujranwala Cougars",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
    {
      id: 10,
      name: "Sialkot Wildcats",
      players: [
        {
          id: 101,
          name: "Neymar Jr.",
          username: "neymar",
          email: "neymar@example.com",
          number: "10",
        },
        {
          id: 102,
          name: "Cristiano Ronaldo",
          username: "ronaldo",
          email: "ronaldo@example.com",
          number: "7",
        },
        {
          id: 103,
          name: "Virgil van Dijk",
          username: "vandijk",
          email: "vandijk@example.com",
          number: "4",
        },
        {
          id: 104,
          name: "Lionel Messi",
          username: "messi",
          email: "messi@example.com",
          number: "10",
        },
        {
          id: 105,
          name: "Kevin De Bruyne",
          username: "debruyne",
          email: "debruyne@example.com",
          number: "17",
        },
        {
          id: 106,
          name: "Kylian Mbappé",
          username: "mbappe",
          email: "mbappe@example.com",
          number: "11",
        },
        {
          id: 107,
          name: "Sergio Ramos",
          username: "ramos",
          email: "ramos@example.com",
          number: "4",
        },
        {
          id: 108,
          name: "Robert Lewandowski",
          username: "lewandowski",
          email: "lewandowski@example.com",
          number: "9",
        },
        {
          id: 109,
          name: "Mohamed Salah",
          username: "salah",
          email: "salah@example.com",
          number: "11",
        },
        {
          id: 110,
          name: "Andrés Iniesta",
          username: "iniesta",
          email: "iniesta@example.com",
          number: "8",
        },
      ],
    },
  ];

  // console.log(teams);

  const {
    data: teams,
    isLoading: isTeamsLoading,
    // error: teamsError,
  } = useGetTeamsQuery({});
  const {
    data: players,
    isLoading: isPlayersLoading,
    // error: playersError,
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
    return (
      <div
        style={{
          width: "50px",
          position: "relative",
          left: "30vw",
          top: "30vh",
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'
          className='loading-spinner'
        >
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#007bff'
            strokeWidth='6'
            strokeLinecap='round'
          >
            <animate
              attributeName='stroke-dashoffset'
              dur='2s'
              repeatCount='indefinite'
              from='0'
              to='502'
            />
            <animate
              attributeName='stroke-dasharray'
              dur='2s'
              repeatCount='indefinite'
              values='150.6 100.4;1 250;150.6 100.4'
            />
          </circle>
        </svg>
      </div>
    );
  }

  // if (teamsError || playersError) {
  //   return <div>Error</div>;
  // }

  return (
    <div>
      <div className='flex justify-between items-center relative top-5 left-10'>
        <div className='flex items-center w-80 h-10'>
          <input
            type='text'
            placeholder='Seach in teams'
            className='w-full h-full px-4 py-2 pl-10 border border-gray-300 rounded-md bg-white relative'
          />
          <img
            src='/assets/icons/SearchIcon.png'
            alt='Search Icon'
            className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
          />
        </div>
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
      <div
        className='rounded-xl border border-solid border-gray-300 w-full m-10 pb-2 pt-2'
        style={{ background: "#F7F7F8" }}
      >
        <div style={{ background: "#F3F4F6" }}>
          <div>
            <div className='flex items-center gap-2 ml-auto'></div>
          </div>

          <table className='w-full mt-2'>
            <thead
              className='h-11 text-gray-600'
              style={{
                borderBottom: "1px solid #e5e7eb",
                background: "#f7f7f8",
              }}
            >
              <tr>
                <th className='w-1/6 text-left pl-4 pb-2 font-medium flex items-center'>
                  <p className='mr-4'>Name</p>
                  <img
                    src='/assets/icons/DownArrowIcon.png'
                    width='12px'
                    height='12px'
                    alt='down icon'
                    className='mr-2'
                  />
                </th>
                <th className='w-3/6 text-left pl-4 pb-2 font-medium'>
                  Players
                </th>
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
                // teams.map((team: TeamProps) => (
                //   <tr
                //     key={team.id}
                //     className='h-16 border-t border-gray-300 bg-white'
                //   >
                //     <td className='w-2/12 text-left pl-4'>{team.name}</td>
                //     <td className='w-7/12 text-left pl-4'>
                //       {team.players.map((player, index) => (
                //         <span key={player.id}>
                //           {player.name}
                //           {index !== team.players.length - 1 && ", "}
                //         </span>
                //       ))}
                //     </td>
                //     <td className='text-right'>
                //       <button onClick={() => openModal(team)}>
                //         <img
                //           src='/assets/icons/EditIcon.png'
                //           alt='Edit Icon'
                //           width={17}
                //           height={17}
                //         />
                //       </button>
                //     </td>
                //     <td className='text-right pr-5'>
                //       <button
                //         onClick={() => deleteTeamById(team.id)}
                //         disabled={isDeletingTeam}
                //       >
                //         <img
                //           src='/assets/icons/DeleteIcon.png'
                //           alt='Delete Icon'
                //           width={17}
                //           height={17}
                //         />
                //       </button>
                //     </td>
                //   </tr>
                // ))
                <>
                  {teamsData.map((team, index) => (
                    <tr
                      key={index}
                      className='h-16 border-t border-gray-300 bg-white'
                    >
                      <td className='w-2/12 text-left pl-4 font-medium text-black'>
                        {team.name}
                      </td>
                      <td className='w-7/12 text-left pl-4 text-gray-600 font-normal'>
                        {team.players.map((player, index) => (
                          <span key={index}>
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
                      checked={teamDetails.players.some(
                        (p) => p.id === player.id
                      )}
                      onChange={(e) => {
                        const player = players.find(
                          (p: { id: number; name: string }) =>
                            p.id.toString() === e.target.value
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
    </div>
  );
};

export default Teams;
