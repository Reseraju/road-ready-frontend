import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Components/Login'
import Home from '../Components/Home'

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/review" element={<Review />} />
        <Route path="/fleets" element={<Fleets />} /> */}
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}
