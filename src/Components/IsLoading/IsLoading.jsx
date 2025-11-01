import React from 'react'
import Style from './IsLoading.module.css'
import { SquareLoader } from 'react-spinners'




const IsLoading = () => {
  return (
    <>

      <div className="flex justify-center items-center h-screen gap-3 dark:bg-base-300 ">
      
        <span className={` ${Style.loader} `}>Loading</span>


      </div>
    </>
  )
}

export default IsLoading




