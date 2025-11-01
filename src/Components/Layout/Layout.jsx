import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'


const Layout = () => {
  return (
    <>
      <Navbar></Navbar>

      <div className='pt-30 bg-slate-200 dark:bg-base-300'>
        <Outlet></Outlet>
      </div>
      
      <Footer></Footer>
    </>
  )
}

export default Layout