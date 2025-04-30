import { Navigate, Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingHistory from './pages/user/BookingHistory'
import CarBooking from './pages/user/CarBooking'
import Profile from './pages/user/Profile'
import PostTestimonial from './pages/user/PostTestimonial'
import Logout from './utils/Logout'
import HomeLayout from './components/HomeLayout'
import DashboardLayout from './pages/user/Layout'

const App = () => {
  return (
    <Routes>
      {/* General Pages */}
      <Route element={<HomeLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      <Route path='/logout' element={<Logout />} />

      {/* User Pages */}
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='/dashboard' element={<Navigate to={'/dashboard/car-booking'} replace />} />
        <Route path='booking-history' element={<BookingHistory />} />
        <Route path='car-booking' element={<CarBooking />} />
        <Route path='profile' element={<Profile />} />
        <Route path='post-testimonials' element={<PostTestimonial />} />
      </Route>
    </Routes>
  )
}

export default App