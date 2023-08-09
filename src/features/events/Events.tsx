import { useState } from "react";
import {
  useGetEventsQuery,
  useAddEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
} from "./eventsApiSlice";
import { useGetTeamsQuery } from "../teams/teamsApiSlice";
import { Link } from "react-router-dom";

export type EventTypes = "PRACTICE" | "MATCH" | "OTHER";

export interface EventProps {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  details: string;
  event_type: EventTypes;
  teamId?: number;
}

interface Team {
  id: number;
  name: string;
}

const Events = () => {
  const eventsData = [
    {
      id: 1,
      name: "League Matches",
      dateAndTime: "6 August 2023 10:30 am",
      category: "Match",
      players: "18 players",
      location: "Gaddafi Stadium, Ferozepur Road, Lahore, Punjab",
    },
    {
      id: 2,
      name: "Friendly Matches",
      dateAndTime: "14 August 2023 3:00 pm",
      category: "Match",
      players: "15 players",
      location: "National Stadium, Liaquat Barracks, Karachi, Sindh",
    },
    {
      id: 3,
      name: "Practice Matches",
      dateAndTime: "20 August 2023 9:00 am",
      category: "Practice",
      players: "14 players",
      location: "Rawalpindi Cricket Stadium, Saidpur Road, Rawalpindi, Punjab",
    },
    {
      id: 4,
      name: "Tournaments",
      dateAndTime: "28 August 2023 11:45 am",
      category: "Match",
      players: "13 players",
      location: "Multan Cricket Stadium, Vehari Road, Multan, Punjab",
    },
    {
      id: 5,
      name: "Cup Matches",
      dateAndTime: "5 September 2023 2:30 pm",
      category: "Match",
      players: "12 players",
      location: "Pindi Cricket Stadium, Murree Road, Rawalpindi, Punjab",
    },
    {
      id: 6,
      name: "Charity Matches",
      dateAndTime: "15 September 2023 6:15 pm",
      category: "Match",
      players: "11 players",
      location: "Iqbal Stadium, Stadium Road, Faisalabad, Punjab",
    },
    {
      id: 7,
      name: "Scrimmages",
      dateAndTime: "22 September 2023 8:45 am",
      category: "Match",
      players: "8 players",
      location:
        "Arbab Niaz Stadium, Circular Road, Peshawar, Khyber Pakhtunkhwa",
    },
    {
      id: 8,
      name: "Training Camps",
      dateAndTime: "30 September 2023 1:30 pm",
      category: "Practice",
      players: "16 players",
      location:
        "Shaheed Mohtarma Benazir Bhutto International Cricket Stadium, Murtaza Shaheed Road, Garhi Khuda Bakhsh, Sindh",
    },
  ];

  const { data: events, isLoading, error } = useGetEventsQuery({});
  const [addEvent] = useAddEventMutation();
  const [editEvent] = useEditEventMutation();
  const [deleteEvent, { isLoading: isDeletingEvent }] =
    useDeleteEventMutation();
  const { data: teams } = useGetTeamsQuery({});
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventProps>({
    id: 0,
    title: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    details: "",
    event_type: "OTHER",
  });

  const openModal = (event: EventProps | null = null) => {
    setIsModalOpen(true);
    setIsAddingEvent(!event);
    setIsEditing(!!event);
    setEventDetails(
      event || {
        id: 0,
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
        details: "",
        event_type: "OTHER",
      }
    );

    // Set the selected team if editing an event
    if (event && event.teamId !== undefined) {
      setSelectedTeam(event.teamId);
    } else {
      setSelectedTeam(null);
    }
  }; // Add this closing bracket

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddingEvent(false);
    setIsEditing(false);
    setEventDetails({
      id: 0,
      title: "",
      date: "",
      start_time: "",
      end_time: "",
      location: "",
      details: "",
      event_type: "OTHER",
    });
  };

  const saveEvent = () => {
    const { id, ...eventData } = eventDetails; // Remove the 'id' property

    if (isAddingEvent) {
      addEvent({ ...eventData, teamId: selectedTeam });
    } else if (isEditing) {
      editEvent({ id: id, ...eventData, teamId: selectedTeam });
    }

    closeModal();
  };

  const deleteEventById = (eventId: number) => {
    deleteEvent(eventId);
  };

  if (isLoading) {
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

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center relative top-5 left-10'>
        <div className='flex items-center w-80 h-10'>
          <input
            type='text'
            placeholder='Seach in events'
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
          style={{ width: "140px", height: "40px" }}
          onClick={() => openModal()}
        >
          <img
            src='/assets/icons/ShareIcon.png'
            alt='Add Icon'
            className='w-4 h-4 mr-2'
          />
          <span>Share Events</span>
        </button>
      </div>
      <div
        className='rounded-xl border border-solid border-gray-300 w-full m-10 pb-2 pt-2'
        style={{ background: "#F7F7F8" }}
      >
        <div>
          <div>
            <div className='flex items-center gap-2 ml-auto'></div>
          </div>
          <table className='w-full'>
            <thead
              className='h-11 text-gray-600'
              style={{
                borderBottom: "1px solid #e5e7eb",
                background: "#f7f7f8",
              }}
            >
              <tr>
                <th className='w-1/12 text-left pl-4 font-medium'>Title</th>
                <th className='w-2/12 text-left pl-4 font-medium'>
                  Date & Time
                </th>
                <th className='w-1/12 text-left pl-4 font-medium'>Category</th>
                <th className='w-1/12 text-left pl-4 font-medium'>Players</th>
                <th className='w-3/12 text-left pl-4 font-medium'>Location</th>
                <th className='w-1/12' colSpan={2}></th>{" "}
                {/* Empty space for edit and delete columns */}
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={7}>
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
                      <p className='text-sm bg-white'>Add event</p>
                    </button>
                  </td>
                </tr>
              ) : (
                // events.map((event: EventProps) => (
                //   <tr
                //     key={event.id}
                //     className='h-16 border-t border-gray-300 bg-white'
                //   >
                //     <td className='pl-4'>
                //       <Link
                //         to={`/dashboard/events/${event.id}`}
                //         className='text-black font-medium'
                //       >
                //         {event.title}
                //       </Link>
                //     </td>
                //     <td className='pl-4 font-normal'>{event.date} - {event.start_time}</td>
                //     <td className='pl-4 font-normal'>
                //       <div className="flex justify-center items-center bg-blue-100 text-blue-600 rounded-2xl border border-blue-300" style={{width: "74px", height: "30px"}}>
                //         {event.event_type.toLocaleLowerCase()}
                //       </div>
                //     </td>
                //     <td className='pl-4 font-normal'>18 Players</td>
                //     <td className='pl-4 font-normal'>2972 Westheimer Rd. Santa Ana, Illinois 85486, USA</td>
                //     <td className='text-right'>
                //       <button onClick={() => openModal(event)}>
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
                //         onClick={() => deleteEventById(event.id)}
                //         disabled={isDeletingEvent}
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
                  {eventsData.map((event) => (
                    <tr
                      key={event.id}
                      className='h-16 border-t border-gray-300 bg-white'
                    >
                      <td className='pl-4'>
                        <Link
                          to={`/dashboard/events/${event.id}`}
                          className='text-black font-medium'
                        >
                          {event.name}
                        </Link>
                      </td>
                      <td className='pl-4 font-normal'>{event.dateAndTime}</td>
                      <td className='pl-4 font-normal'>
                        <div
                          className='flex justify-center items-center bg-blue-100 text-blue-600 rounded-2xl border border-blue-300'
                          style={{ width: "74px", height: "30px" }}
                        >
                          {event.category}
                        </div>
                      </td>
                      <td className='pl-4 font-normal'>{event.players}</td>
                      <td className='pl-4 font-normal'>{event.location}</td>
                      <td className='text-right'>
                        <button onClick={() => openModal(event)}>
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
                          onClick={() => deleteEventById(event.id)}
                          disabled={isDeletingEvent}
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
              <h2 className='text-xl font-bold mb-6 text-center'>
                {isEditing ? "Edit Event Details" : "Add Event Details"}
              </h2>
              <form className='flex flex-col gap-4' onSubmit={saveEvent}>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  placeholder='Event name'
                  value={eventDetails.title}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, title: e.target.value })
                  }
                />

                <label htmlFor='team'>Select Team</label>
                <select
                  id='team'
                  name='team'
                  className='border border-gray-300 rounded-md px-2 py-1'
                  value={selectedTeam === null ? "" : selectedTeam}
                  onChange={(e) => setSelectedTeam(Number(e.target.value))}
                >
                  <option value=''>Select a team</option>
                  {teams &&
                    teams.map((team: Team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                </select>
                <label htmlFor='event-type'>Event Type</label>
                <select
                  id='event-type'
                  name='event-type'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  value={eventDetails.event_type}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      event_type: e.target.value as EventTypes,
                    })
                  }
                >
                  <option value='PRACTICE'>Practice</option>
                  <option value='MATCH'>Match</option>
                  <option value='OTHER'>Other</option>
                </select>

                <label htmlFor='date'>Date</label>
                <input
                  type='date'
                  id='date'
                  name='date'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  value={eventDetails.date}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, date: e.target.value })
                  }
                />

                <label htmlFor='time'>Start Time</label>
                <input
                  type='time'
                  id='time'
                  name='time'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  value={eventDetails.start_time}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      start_time: e.target.value,
                    })
                  }
                />

                <label htmlFor='time'>End Time</label>
                <input
                  type='time'
                  id='time'
                  name='time'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  value={eventDetails.end_time}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      end_time: e.target.value,
                    })
                  }
                />

                <label htmlFor='location'>Location</label>
                <input
                  type='text'
                  id='location'
                  name='location'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  placeholder='Event location'
                  value={eventDetails.location}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      location: e.target.value,
                    })
                  }
                />

                <label htmlFor='details'>Details</label>
                <textarea
                  id='details'
                  name='details'
                  className='border border-gray-300 rounded-md px-2 py-1 w-full'
                  placeholder='Event details'
                  value={eventDetails.details}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      details: e.target.value,
                    })
                  }
                />

                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md mr-2'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='bg-blue-700 text-white font-semibold px-4 py-2 rounded-md'
                  >
                    {isEditing ? "Save" : "Add"}
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

export default Events;
