import React, { createContext, useEffect, useState } from 'react'
import Style from './AuthContextProvider.module.css'


export const authContext = createContext();

const AuthContextProvider = ({ children }) => {


  const [token, setToken] = useState(null);

  function saveToken(userToken) {
    setToken(userToken);
  }

  function removeToken() {
    setToken(null);
    localStorage.removeItem("token");

    
  }

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token != null) {
    setToken(token);
  }
}, []);

  return (
    <authContext.Provider value={{token, saveToken , removeToken}}>
      <div>{children}</div>
    </authContext.Provider>
  )
}

export default AuthContextProvider