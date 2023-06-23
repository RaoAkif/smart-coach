import { useParams } from "react-router-dom";
import { useGetEventsWithPlayersQuery } from "./eventsApiSlice";

type PlayerAvailabilityTypes = "PENDING" | "GOING" | "NOT_GOING";

interface Player {
  id: number;
  name: string;
  availability_status: PlayerAvailabilityTypes
}

const EventDetails = () => {
  const { eventId } = useParams();
  const { data: event, isLoading, isError } = useGetEventsWithPlayersQuery(eventId);

  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (isError) {
    return <div>Error fetching event details</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="mt-5">
      <div className="mx-5 p-3 rounded-lg" style={{ border: '1px solid #e5e7eb' }}>
        <h2 className="mb-3 text-3xl font-bold">{event.title}</h2>
        <p className="mb-3 text-2xl font-bold">About this Event</p>
        <p className="mb-1 text-base font-bold">Category</p>
        <p className="mb-3 text-base">{event.event_type}</p>
        <p className="mb-1 text-base font-bold">Date & Time:</p>
        <p className="mb-3 text-base">{event.date}, {event.end_time} - {event.start_time}</p>
        <p className="mb-1 text-base font-bold">Duration:</p>
        <p className="mb-3 text-base">{event.end_time} - {event.start_time} hour/s</p>
        <p className="mb-1 text-base font-bold">Location:</p>
        <p className="mb-5 text-base">{event.location}</p>
        <p className="mb-2 text-2xl font-bold">Details</p>
        <p className="mb-1 text-lg font-bold">Description</p>
        <p className="mb-3 text-base">{event.details}</p>
        <p className="mb-1 text-lg font-bold">Players</p>
        <ul>
          {event.team.players.map((player: Player) => (
            <li key={player.id}>
              <div>
                {player.name}: {player.availability_status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
