import { useState } from "react"
import { useDispatch } from "react-redux"
import { createDestination } from '../features/destinations/destinationSlice'
import { useNavigate } from 'react-router-dom'

import { apiKey } from '../config'

import axios from 'axios'

function DestinationForm() {
    const navigate = useNavigate()
    const [destination, setDestination] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    if(!destination){
      console.log('Please fill out the form')
      return
    }

    axios.get(`https://api.unsplash.com/search/photos?query=${destination}&orientation=landscape&page=1&client_id=${apiKey}`)
    .then((response) => {
      console.log(response.data.results[0])
      dispatch(createDestination({ 
        destination: destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase(),
        url: response.data.results[0].urls.full
      }))
    })
    .catch(err => console.log(err))

    setDestination('')
    navigate('/')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'></label>
          <input
            type='text'
            name='text'
            id='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block btn-add-destination' type='submit'>
            Add Destination
          </button>
          <button onClick={() => navigate('/')} className="btn btn-cancel">Cancel</button>
        </div>
      </form>
    </section>
  )
}

export default DestinationForm