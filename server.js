const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');                                 // Add cors as a middleware.

const petRouter = require('./controllers/pets.js')            // Import the controller file.

app.use(cors({
    origin: 'http://localhost:5173'                           // White list.
}))

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

app.use('/pets', petRouter)                               // Add the petRouter to the `/pets` route.

app.listen(3000, () => {
  console.log('The express app is ready!🎧');
});
