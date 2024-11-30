import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '../Components/Login'
import Home from '../Components/Home'
import ContactForm from '../Components/Contact'
import About from '../Components/About'
import RegisterPage from '../Components/Register'

import CarsFleet from '../Components/CarsFleet'
import PersistentDrawerLeft from '../Components/Profile'
import Account from '../Components/Profile_Sidebar/Account'
import Notifications from '../Components/Profile_Sidebar/Notifications'
import NoMatch from './NoMatch'
import Reservations from '../Components/Profile_Sidebar/Reservations'
import Payment from '../Components/Profile_Sidebar/Payment'
import History from '../Components/Profile_Sidebar/History'
import Feedback from '../Components/Profile_Sidebar/Feedback'
import Logout from '../Components/Profile_Sidebar/Logout'
import CarDetails from '../Components/CarDetails'

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/fleets" element={<CarsFleet />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage />} />
        

        {/* Profile-related Routes */}
        <Route path="/profile" element={<PersistentDrawerLeft />}>
          {/* Redirect from /profile to /profile/account */}
          <Route index element={<Navigate to="account" />} />
          <Route path="account" element={<Account />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="payment" element={<Payment />} />
          <Route path="history" element={<History />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Route>



      </Routes>
    </div>
  )
}
