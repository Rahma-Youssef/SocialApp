import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'


const Layout = () => {
  return (
    <>
      <Navbar></Navbar>

      <div className='mt-30'>
        <Outlet></Outlet>
      </div>
      
      <Footer></Footer>
    </>
  )
}

export default Layout