import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {


  if(localStorage.getItem("token") == null){
    return <Navigate to={"/login"}/>
  }

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute