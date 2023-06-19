import { useParams } from "react-router-dom";
import { useGetEventsWithPlayersQuery } from "./eventsApiSlice";

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
    <div>
      <h2>Event Details</h2>
      <p>Event ID: {eventId}</p>
      <p>Title: {event.title}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Details: {event.details}</p>
      <p>Team: {event.Team.name}</p>
      <p>Players:</p>
      <ul>
        {event.Team.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
