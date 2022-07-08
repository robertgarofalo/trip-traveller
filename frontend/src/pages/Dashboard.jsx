import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDestinations, reset } from '../features/destinations/destinationSlice'

// components
import Header from '../components/Header'
import DestinationItem from '../components/DestinationItem'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { destinations, isLoading, isError, message } = useSelector(
    (state) => state.destinations
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getDestinations())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='dashboard-container'>
    <Header />
    <div>
      <section className='dashboard-heading'>
        <h1>Welcome {user && user.name}</h1>
        { destinations.length > 0 && <p>Your ideal destinations</p> }
      </section>

      <section className='destination-container'>
        {destinations.length > 0 ? (
          <div className='destinations'>
            {destinations.map((destination) => (
              <DestinationItem key={destination._id} destination={destination}/>
            ))}
          </div>
        ) : (
          <h3>You have not set any destinations</h3>
        )}
      </section>
      </div>

      <Footer />
    </div>
  )
}
//
export default Dashboard
