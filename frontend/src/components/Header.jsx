import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlane } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const addDestination = () => {
    navigate('/add-destination')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <FaPlane />
        <Link to='/'>Trip Traveller</Link>
      </div>
      <ul>
          <li>
            <button className='btn btn-add-new' onClick={addDestination}>
              Add Destination
            </button>
          </li>
          <li>
            <button className='btn btn-logout' onClick={onLogout}>
              Log out
            </button>
          </li>
      </ul>
    </header>
  )
}

export default Header
