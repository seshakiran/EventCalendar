# Emerging Tech Hub Event Calendar

This project is a web application that displays an event calendar for Emerging Tech Hub using MongoDB, Node.js, and React.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)
- npm (v6 or later)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd emertechevents
   ```

2. Install dependencies:
   ```
   npm install
   cd client && npm install && cd ..
   ```

3. Set up MongoDB:
   - Ensure MongoDB is installed and running on your system
   - The application will create the necessary database and collection automatically

4. Configure server environment variables:
   - Create a `.env` file in the root directory with the following content:
     ```
     PORT=5001
     MONGODB_URI=mongodb://localhost:27017/emertechevents
     ```
   - Adjust the MONGODB_URI if your MongoDB is running on a different host or port
   - You can change the PORT number if 5001 is already in use on your system

5. Configure client environment variables:
   - Create a `.env` file in the `client` directory with the following content:
     ```
     REACT_APP_API_URL=http://localhost:5001
     ```
   - Make sure the port number matches the one you set in the server's `.env` file

6. Populate the database with sample data:
   ```
   node populate_db.js
   ```

## Running the Application

1. Start both the backend server and React frontend:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Verify that MongoDB is running and accessible.
3. Check that both server and client `.env` files contain the correct values.
4. If the server fails to start due to the port being in use, try changing the PORT in both `.env` files.
5. If changes are made to the server code, restart the server.
6. Make sure you've run the populate_db.js script to insert sample data.
7. Clear your browser cache or try in an incognito/private window if you're not seeing updates.

## Development

- To run only the backend server: `npm run server`
- To run only the React frontend: `npm run client`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.