import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EventForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const EventForm = ({ editingEvent, onEventUpdated }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    title: '',
    description: '',
    image_url: '',
    image_file: null,
    speaker: '',
    organization: '',
    who_should_attend: '',
    location: '',
    zoom_link: '',
    recording_link: '' // Add recording link to formData
  });

  useEffect(() => {
    if (editingEvent) {
      const eventDate = new Date(editingEvent.date);
      setFormData({
        date: isNaN(eventDate) ? new Date() : eventDate, // Use current date if invalid
        title: editingEvent.title,
        description: editingEvent.description,
        image_url: editingEvent.image_url,
        speaker: editingEvent.speaker,
        organization: editingEvent.organization,
        who_should_attend: editingEvent.who_should_attend,
        location: editingEvent.location,
        zoom_link: editingEvent.zoom_link,
        recording_link: editingEvent.recording_link // Initialize recording link
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_url: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      date: formData.date.toISOString().split('T')[0],
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      speaker: formData.speaker,
      organization: formData.organization,
      who_should_attend: formData.who_should_attend,
      location: formData.location,
      zoom_link: formData.zoom_link,
      recording_link: formData.recording_link // Include recording link in submission
    };

    try {
      const method = editingEvent ? 'PUT' : 'POST';
      const url = editingEvent ? `${API_URL}/api/events/${editingEvent._id}` : `${API_URL}/api/events`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Event saved successfully!');
        setFormData({
          date: new Date(),
          title: '',
          description: '',
          image_url: '',
          image_file: null,
          speaker: '',
          organization: '',
          who_should_attend: '',
          location: '',
          zoom_link: '',
          recording_link: ''
        });
        onEventUpdated();
      } else {
        alert('Failed to save event. Please try again.');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="event-form">
      <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
      <form onSubmit={handleSubmit}>
        <DatePicker selected={formData.date} onChange={handleDateChange} />
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" />
        <input type="file" name="image_file" onChange={handleFileChange} />
        <input type="text" name="speaker" value={formData.speaker} onChange={handleChange} placeholder="Speaker" required />
        <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" required />
        <textarea name="who_should_attend" value={formData.who_should_attend} onChange={handleChange} placeholder="Who should attend" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input type="text" name="zoom_link" value={formData.zoom_link} onChange={handleChange} placeholder="Zoom Link" />
        <input type="text" name="recording_link" value={formData.recording_link} onChange={handleChange} placeholder="Recording Link" />
        <button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</button>
      </form>
    </div>
  );
};

export default EventForm;
