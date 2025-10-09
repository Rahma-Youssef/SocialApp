import React, { createContext, useState } from 'react'
import Style from './IsLoadingStateContext.module.css'



 export const LoadingContext = createContext();


const IsLoadingStateContext = ({ children }) => {

  const [isLoading , setIsLoading] = useState(false);
 

  return (
    <LoadingContext.Provider value={{ isLoading , setIsLoading }}>
    {children}
    </LoadingContext.Provider>
  )
}

export default IsLoadingStateContext