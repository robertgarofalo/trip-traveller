const asyncHandler = require('express-async-handler')

const Destination = require('../models/destinationModel')
const User = require('../models/userModel')

// @desc    Get destinations
// @route   GET /api/destinations
// @access  Private

const getDestinations = asyncHandler(async (req, res) => {
    const destinations = await Destination.find({ user: req.user.id })

    res.status(200).json(destinations)
})


// @desc    Set destinations
// @route   POST /api/destinations
// @access  Private

const setDestination = asyncHandler(async(req, res) => {
    if(!req.body.destination){
        res.status(400)
        throw new Error('Please add a destination')
    }

    const destination = await Destination.create({
        destination: req.body.destination,
        url: req.body.url,
        user: req.user.id
    })

    res.status(200).json(destination)
})

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private
const updateDestination = asyncHandler(async(req, res) => {
    const destination = await Destination.findById(req.params.id)

    if(!destination) {
        res.status(400)
        throw new Error('Destination not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check that current logged in user matches the destination user
    if(destination.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedDestination)
})

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private

const deleteDestination = asyncHandler(async(req, res) => {
    const destination = await Destination.findById(req.params.id)

    if(!destination){
        res.status(400)
        throw new Error('No destination found')
    }

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(destination.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await destination.remove()

    res.status(200).json({ 
            id: req.params.id,
            deleted:  destination.destination
        })   
})

module.exports = {
    getDestinations,
    setDestination,
    updateDestination,
    deleteDestination,
}