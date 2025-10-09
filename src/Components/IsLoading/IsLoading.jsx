import React from 'react'
import Style from './IsLoading.module.css'
import { SquareLoader } from 'react-spinners'




const IsLoading = () => {
  return (
    <>

      <div className="flex justify-center items-center h-screen gap-3">
        <SquareLoader color="#1718d5"  />

      </div>
    </>
  )
}

export default IsLoading




