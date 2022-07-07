import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/destinations/destinationSlice'

// components
import Header from '../components/Header'
import DestinationForm from '../components/DestinationForm'
import Footer from '../components/Footer'

function AddDestination() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  return (
    <div className='dashboard-container'>
    <Header />
    <div>
      <section className='dashboard-heading'>
        <p>Where would you like to go?</p>
      </section>
      <DestinationForm />

    </div>
    <Footer />

    </div>
  )
}

export default AddDestination
