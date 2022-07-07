import axios from 'axios'

const API_URL = '/api/destinations/'

// Create destination
const createDestination = async (destinationData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(API_URL, destinationData, config)

      return response.data
}

// Get destinations
const getDestinations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data

}

// Delete destination
const deleteDestination = async (destinationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + destinationId, config)

  return response.data
}

const destinationService = {
    createDestination,
    getDestinations,
    deleteDestination
}

export default destinationService