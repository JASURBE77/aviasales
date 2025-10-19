import React from 'react'
import Footer from './components/Footer'
import FooterNavbar from './components/FooterNavbar'
import Products from './components/Products'
import Header from './components/Header'
import Products2 from './components/Products2'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
