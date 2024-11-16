// models/pet.js
const mongoose = require('mongoose');                // import the mongoose library

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
    },
    breed: String,
});

const Pet = mongoose.model('Pet', petSchema);         // register the model

module.exports = Pet;                                 // export the model 

