// controllers/pets.js
const Pet = require('../models/pet.js')                                                  //Import the model.
const express = require('express')
const router = express.Router()                                                          //Create a router to attach our routes to.

//--------------------------------------------------------------------------\\
// POST, CREATE - This route will handle data sent when users submit a form. Path is `/pets`.
router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body)
        res.status(201).json(createdPet)                                                 //This sends the JSON response containing the created pet object.
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})
//----------------------------------------------------------------------------\\
// GET, READ, INDEX - Create an index route to retrieve all pets from the database. Path is `/pets`.
router.get('/', async (req, res) => {
    try {                                                                                   //Throw new Error('This is an error message') to test the error message. New creates a new object, in this case it's from the class of error, so new error makes an error object, since an error object has been thrown, we catch it.
        const foundPetsList = await Pet.find()                                              //This returns all pets in the database.
        res.status(200).json({ pets: foundPetsList, msg:'found pets!' })                    //Send a JSON response to the client with the pets array.
} catch(err) {
    res.status(500).json({ error: err.message })
}
})
//------------------------------------------------------------------------------\\
// GET, READ, SHOW - Create a show route to find a single pet. path is `/pets/:petId`.
router.get('/:petId', async (req,res) => {
    //res.json({ message: `Show route with the param ${req.params.petId}`})
    try {
        const foundSinglePet = await Pet.findById(req.params.petId)                        //Add query to find a single pet.
        if (!foundSinglePet) {
            res.status(404);
            throw new Error('Pet not found.')                                              //We need to find a way to stop the function's execution. We can do this by throwing a new error, this throw will be caught in the catch block, where we can send an error response to the client.
        }
        res.status(200).json(foundSinglePet)
    } catch(err) {
        if (res.statusCode === 404) {
            res.json({ error: err.message })
        } else {
            res.status(500).json({ error: err.message })
        }
    }
})
//------------------------------------------------------------------------------\\
// DELETE, DELETE - Create a new route to delete a single pet. This route will be a DELETE request to /pets/:petId, returning a JSON response with the deleted pet.
router.delete('/:petId', async (req, res) => {
    try {
        //throw new Error('This is a test error');
        const deletePet = await Pet.findByIdAndDelete(req.params.petId)
        if (!deletePet) {
            res.status(404);
            throw new Error('Pet not found.')
        }
        res.status(200).json({ message: 'The deleted pet is:', pet: deletePet })
    } catch(err) {
        if (res.statusCode === 404) {
            res.json({ error: err.message})
        } else {
            res.status(500).json({ error: err.message })
        }
    }
})
//------------------------------------------------------------------------------\\
//UPDATE, PUT - Create a new route to update a single pet. This route will be a PUT request to /pets/:petId, and will return a JSON response with the updated pet.
router.put('/:petId', async (req, res) => {
    //res.json({ message: `Update route with the param ${req.params.petId}`})
    try {
        const updatePet = await Pet.findByIdAndUpdate(req.params.petId, req.body)
        if (!updatePet) {
            res.status(404);
            throw new Error('Pet not found')
        }
        res.status(200).json(updatePet)
    } catch(err) {
        if (res.statusCode === 404) {
            res.json({ error: err.message })
        } else {
            res.status(500).json({ error: err.message })
        }
    }
})












module.exports = router                                                                   //Export router.




