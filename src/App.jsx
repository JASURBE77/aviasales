import React from 'react'
import Footer from './components/Footer'
import FooterNavbar from './components/FooterNavbar'
import Products from './components/Products'
import Header from './components/Header'
import Products2 from './components/Products2'

const App = () => {
  return (
    <div>
      <Header />
      <div className='absolute -mt-60 left-0  w-full z-10'>
        
      <Products />
      </div>
   <div className='mt-150'>
       <Products2 />
   </div>
      <FooterNavbar />
      <Footer/>
    </div>
  )
}

export default App
