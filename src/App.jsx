import React, { lazy, Profiler, Suspense } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
const Home = lazy(() => import("./Components/Home/Home"));
const Login = lazy(() => import("./Components/Login/Login"));
const Layout = lazy(() => import("./Components/Layout/Layout"));
const Register = lazy(() => import("./Components/Register/Register"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const PostDetails = lazy(() => import("./Components/PostDetails/PostDetails"));
import IsLoadingStateContext from './Components/IsLoadingStateContext/IsLoadingStateContext'
import AuthContextProvider from './Components/AuthContextProvider/AuthContextProvider'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { Offline, Online } from 'react-detect-offline'
import IsLoading from './Components/IsLoading/IsLoading'


function App() {

  const router = createBrowserRouter([

    {
      path:'', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: '/postdetails/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        {
          path: '*', element: (<div className='h-screen flex justify-center items-center'>
            <h1 className='text-red-600 text-8xl'>404 Not Found</h1>
          </div>
          )
        },



      ]
    },])


  const client = new QueryClient();

  return (
    <>
      <Suspense fallback={<IsLoading></IsLoading>}>


        <AuthContextProvider>
          <QueryClientProvider client={client}>
            <IsLoadingStateContext>
              <Toaster></Toaster>
              {/* <Offline>
                <div className='p-3 rounded-2xl bg-amber-600 fixed top-1/2 start-0'>
                  Only shown offline (surprise!)
                </div>
              </Offline> */}
              <RouterProvider router={router}>
              </RouterProvider>
            </IsLoadingStateContext>
          </QueryClientProvider>
        </AuthContextProvider>
      </Suspense>


    </>
  )
}

export default App
