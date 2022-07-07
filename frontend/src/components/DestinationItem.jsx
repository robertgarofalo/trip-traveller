import { useDispatch } from 'react-redux'
import { deleteDestination } from '../features/destinations/destinationSlice' 

import { FaRegTrashAlt } from 'react-icons/fa'

function DestinationItem({ destination }) {
  const dispatch = useDispatch()

  const bookingUrl = `https://www.expedia.com.au/Hotel-Search?adults=2&d1=2022-07-22&d2=2022-07-23&destination=${destination.destination}&endDate=2022-07-23&rooms=1&semdtl=&sort=RECOMMENDED&startDate=2022-07-22&theme=&useRewards=false&userIntent=`

  return (
    <div className='destination-item'>
      <img src={destination.url} alt='image_1'/>
      <h2>{destination.destination}</h2>
      <a href={bookingUrl} target='_blank' rel='noreferrer' className='btn btn-book-now'>BOOK NOW</a>
      <span onClick={() => dispatch(deleteDestination(destination._id))} className='btn-close-container'><FaRegTrashAlt className='btn-close'/></span>
    </div>
  )
}

export default DestinationItem
