const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const eventSchema = new mongoose.Schema({
  date: String,
  title: String,
  description: String,
  image_url: String,
  speaker: String,
  organization: String,
  who_should_attend: String,
  location: String,
  zoom_link: String,
  recording_link: String // Add recording_link to schema
});

const Event = mongoose.model('Event', eventSchema);

const sampleEvents = [
  {
    date: 'Sep 26',
    title: 'RAG',
    description: 'Chat with Data',
    image_url: 'https://example.com/rag.jpg',
    speaker: 'Ramesh Chitipolu',
    organization: 'Emerging Tech Hub',
    who_should_attend: 'AI Enthusiasts, practitioners, Data Scientists, AI/ML Engineers',
    location: 'Zoom call Online',
    zoom_link: 'https://us02web.zoom.us/j/your_zoom_link_here',
    recording_link: 'https://example.com/recording1' // Example recording link
  },
  {
    date: 'Oct 06',
    title: 'Understanding Azure AI',
    description: 'Cloud LLMs',
    image_url: 'https://example.com/azure_ai.jpg',
    speaker: 'Phaneendra P',
    organization: 'Emerging Tech Hub',
    who_should_attend: 'AI Enthusiasts, practitioners, Data Scientists, AI/ML Engineers',
    location: 'Zoom call Online',
    zoom_link: 'https://us02web.zoom.us/j/your_zoom_link_here',
    recording_link: 'https://example.com/recording2' // Example recording link
  },
  // Add more sample events as needed
];

async function populateDatabase() {
  try {
    await Event.deleteMany({});
    await Event.insertMany(sampleEvents);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    mongoose.connection.close();
  }
}

populateDatabase();
