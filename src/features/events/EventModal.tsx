import { useEffect, useState } from "react";
import { useGetTeamsQuery } from "../teams/teamsApiSlice";
import { EventProps, EventTypes } from "./Events";
import { useAddEventMutation, useEditEventMutation } from "./eventsApiSlice";
import { TeamProps } from "../teams/Teams";

const EventModal = ({openEventModal, setOpenEventModal}: {openEventModal: boolean, setOpenEventModal: (open: boolean)=>void}) => {
    const [addEvent] = useAddEventMutation();
    const [editEvent] = useEditEventMutation();
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
      setOpenEventModal(false);
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

    useEffect(() => {
        if(openEventModal)
            openModal();
    }, [openEventModal])

    return (
        isModalOpen ?
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div
        className='bg-white rounded-lg p-6 overflow-y-auto'
        style={{ width: '60%', height: "70%" }}
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
                teams.map((team: TeamProps) => (
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
                setEventDetails({ ...eventDetails, end_time: e.target.value })
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
                setEventDetails({ ...eventDetails, location: e.target.value })
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
                setEventDetails({ ...eventDetails, details: e.target.value })
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
        : null
    )
}

export default EventModal;