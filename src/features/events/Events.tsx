import { useState } from "react";
import { useGetEventsQuery, useAddEventMutation, useEditEventMutation, useDeleteEventMutation } from "./eventsApiSlice";
import { Link } from "react-router-dom";

type EventTypes = "PRACTICE" | "MATCH" | "OTHER";

interface EventProps {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  details: string;
  event_type: EventTypes;
}

const Events = () => {
  const { data: events, isLoading, error } = useGetEventsQuery({});
  const [addEvent] = useAddEventMutation();
  const [editEvent] = useEditEventMutation();
  const [deleteEvent, { isLoading: isDeletingEvent }] = useDeleteEventMutation();
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
    event_type: "OTHER"
  });
  
  const openModal = (event: EventProps | null = null) => {
    setIsModalOpen(true);
    setIsAddingEvent(!event);
    setIsEditing(!!event);
    setEventDetails(event || {
      id: 0,
      title: "",
      date: "",
      start_time: "",
      end_time: "",
      location: "",
      details: "",
      event_type: "OTHER"
    });
  };

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
      event_type: "OTHER"
    });
  };

  const saveEvent = () => {
    if (isAddingEvent) {
      addEvent(eventDetails);
    } else if (isEditing) {
      editEvent({ eventDetails });
    }

    closeModal();
  };

  const deleteEventById = (eventId: number) => {
    deleteEvent(eventId);
  };

  if (isLoading) {
    return <div>Loading events...</div>;
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
              <h2 className="text-lg font-bold">All Events</h2>
              <div className="flex items-center bg-blue-100 text-blue-700 font-semibold justify-center border-2 border-blue-300 rounded-full px-2 py-1" style={{ width: '74px', height: '22px', fontSize: '12px' }}>
                <span>{events.length}</span>
                <span className="ml-1">
                  {events.length === 1 ? 'Event' : 'Events'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center justify-center bg-blue-700 text-white px-2 py-1 rounded-md" style={{ width: '133px', height: '40px' }} onClick={() => openModal()}>
              <img src="/assets/icons/WhiteAddIcon.png" alt="Add Icon" className="w-4 h-4 mr-1" />
              <span>Add Event</span>
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="h-11 border-b-2 bg-gray-100">
            <tr>
              <th className="w-1/6 text-left pl-4">Title</th>
              <th className="w-1/6 text-left pl-4">Date</th>
              <th className="w-1/6 text-left pl-4">Start Time</th>
              <th className="w-1/6 text-left pl-4">Location</th>
              <th className="w-1/6 text-left pl-4">Details</th>
              <th className="w-1/12" colSpan={2}></th> {/* Empty space for edit and delete columns */}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <button onClick={() => openModal()} className="flex text-center pt-5 pb-2 pl-5 justify-center items-center">
                    <img
                      src="/assets/icons/AddButtonDottedOutline.png"
                      alt="Add Icon"
                      className="mr-2"
                      width={25}
                      height={25}
                    />
                    <p className="text-sm bg-white">Add event</p>
                  </button>
                </td>
              </tr>
            ) : (
              events.map((event: EventProps) => (
                <tr key={event.id}>
                  <td className="pl-4">
                    <Link to={`/dashboard/events/${event.id}`}>
                      {event.title}
                    </Link>
                  </td>
                  <td className="pl-4">{event.date}</td>
                  <td className="pl-4">{event.start_time}</td>
                  <td className="pl-4">{event.location}</td>
                  <td className="pl-4">{event.details}</td>
                  <td>
                    <button className="text-blue-700 font-semibold hover:underline" onClick={() => openModal(event)}>Edit</button>
                  </td>
                  <td>
                    <button className="text-red-700 font-semibold hover:underline" onClick={() => deleteEventById(event.id)} disabled={isDeletingEvent}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 overflow-y-auto" style={{ width: '544px', height: '480px' }}>
            <h2 className="text-xl font-bold mb-6 text-center">
              {isEditing ? "Edit Event Details" : "Add Event Details"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={saveEvent}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                placeholder="Event name"
                value={eventDetails.title}
                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
              />
              
              <label htmlFor="event-type">Event Type</label>
              <select
                id="event-type"
                name="event-type"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                value={eventDetails.event_type}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    event_type: e.target.value as EventTypes
                  })
                }
              >
                <option value="PRACTICE">Practice</option>
                <option value="MATCH">Match</option>
                <option value="OTHER">Other</option>
              </select>

              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                value={eventDetails.date}
                onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
              />

              <label htmlFor="time">Start Time</label>
              <input
                type="time"
                id="time"
                name="time"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                value={eventDetails.start_time}
                onChange={(e) => setEventDetails({ ...eventDetails, start_time: e.target.value })}
              />

              <label htmlFor="time">End Time</label>
              <input
                type="time"
                id="time"
                name="time"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                value={eventDetails.end_time}
                onChange={(e) => setEventDetails({ ...eventDetails, end_time: e.target.value })}
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                placeholder="Event location"
                value={eventDetails.location}
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
              />

              <label htmlFor="details">Details</label>
              <textarea
                id="details"
                name="details"
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                placeholder="Event details"
                value={eventDetails.details}
                onChange={(e) => setEventDetails({ ...eventDetails, details: e.target.value })}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
                >
                  {isEditing ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
