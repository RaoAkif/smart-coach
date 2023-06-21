import React from "react";

interface EventProps {
  event: {
    id: number;
    name: string;
    date: string;
    time: string;
    location: string;
    details: string;
  };
}

const Event: React.FC<EventProps> = ({ event }) => {
  const handleEdit = () => {
    // editEvent(event);
  };

  const handleDelete = () => {
    // deleteEvent(event.id);
  };

  return (
    <div>
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
      <p>Date: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Details: {event.details}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Event;
