const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Event Schema
const eventSchema = new mongoose.Schema({
  date: String,
  title: String,
  description: String,
  image_url: String,
  speaker: String,
  organization: String,
  who_should_attend: String,
  location: String,
  zoom_link: String
});

const Event = mongoose.model('Event', eventSchema);

// API endpoint to fetch events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// API endpoint to add a new event
app.post('/api/events', async (req, res) => {
  try {
    const { date, title, description, image_url, speaker, organization, who_should_attend, location, zoom_link } = req.body;

    const newEvent = new Event({
      date,
      title,
      description,
      image_url,
      speaker,
      organization,
      who_should_attend,
      location,
      zoom_link
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Error adding new event:', err);
    res.status(500).json({ error: 'Error adding new event' });
  }
});

// API endpoint to update an existing event
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, description, image_url, speaker, organization, who_should_attend, location, zoom_link } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(id, {
      date,
      title,
      description,
      image_url,
      speaker,
      organization,
      who_should_attend,
      location,
      zoom_link
    }, { new: true });

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Error updating event' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});