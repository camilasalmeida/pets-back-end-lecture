const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const petRouter = require('./controllers/pets.js')            // import the controller file


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Routes go here
app.use('/pets', petRouter)                               // add the petRouter to the `/pets` route


app.listen(3000, () => {
  console.log('The express app is ready!🎧');
});
