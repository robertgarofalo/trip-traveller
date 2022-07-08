const express = require('express')
const router = express.Router()
const { 
getDestinations,
setDestination,
updateDestination,
deleteDestination
} = require('../controllers/destinationController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getDestinations).post(protect, setDestination)
router.route('/:id').delete(protect, deleteDestination).put(protect, updateDestination)

module.exports = router