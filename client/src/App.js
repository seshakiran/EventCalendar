import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import './App.css';

function App() {
  const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (event) => {
    setEditingEvent(event);
    navigate('/edit-event');
  };

  const handleEventUpdated = () => {
    setEditingEvent(null);
    navigate('/');
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Calendar</Link>
          </li>
          <li>
            <Link to="/add-event">Add Event</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Calendar onEdit={handleEdit} />} />
        <Route path="/add-event" element={<EventForm onEventUpdated={handleEventUpdated} />} />
        <Route path="/edit-event" element={<EventForm editingEvent={editingEvent} onEventUpdated={handleEventUpdated} />} />
      </Routes>
    </div>
  );
}

export default App;
