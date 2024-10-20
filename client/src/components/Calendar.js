import React, { useState, useEffect } from 'react';
import './Calendar.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const Calendar = ({ onEdit }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await response.json();
      // Sort events by date in ascending order
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const getImageSrc = (event) => {
    return event.image_url;
  };

  return (
    <div className="calendar">
      <h1>Emerging Tech Hub</h1>
      <h2>Event Calendar</h2>
      <div className="events-container">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <div className="event-header">
              <div className="event-date" onClick={() => onEdit(event)}>{formatDate(event.date)}</div>
            </div>
            <div className="event-image">
              <img src={getImageSrc(event)} alt={event.title} />
            </div>
            <div className="event-title">{event.title}</div>
            <div className="event-description">{event.description}</div>
            <div className="event-speaker"><strong>{event.speaker}</strong></div> {/* Bold speaker name */}
            <div className="event-organization">{event.organization}</div>
            <div className="event-attendees">{event.who_should_attend}</div>
            <div className="event-location">{event.location}</div>
            {event.zoom_link && (
              <div className="event-zoom">
                <a href={event.zoom_link} target="_blank" rel="noopener noreferrer">Join Zoom Meeting</a>
              </div>
            )}
            {event.recording_link && (
              <div className="event-watch">
                <a href={event.recording_link} target="_blank" rel="noopener noreferrer">Watch Recording</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
