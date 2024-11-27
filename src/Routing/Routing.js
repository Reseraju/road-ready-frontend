import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Components/Login'
import Home from '../Components/Home'
import ContactForm from '../Components/Contact'
import About from '../Components/About'
import RegisterPage from '../Components/Register'

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        {/*
        
        <Route path="/review" element={<Review />} />
        <Route path="/fleets" element={<Fleets />} /> */}
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}
