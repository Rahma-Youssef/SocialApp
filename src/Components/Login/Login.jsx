import React, { useContext, useEffect, useState } from 'react'
import Style from './Login.module.css'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadingContext } from '../IsLoadingStateContext/IsLoadingStateContext';
import { authContext } from '../AuthContextProvider/AuthContextProvider';
import { Icon } from '@iconify-icon/react';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { saveToken } = useContext(authContext);

  const navigate = useNavigate();


  const schema = z.object({

    email: z.string().nonempty("email is required").email("Email is not valid"),
    password: z.string().min(6, "Password must be at least 6 characters long").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain at least one letter and one number"),


  })




  async function SendData(values) {
    setIsLoading(true);

    try {
      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", values);
      console.log(data);

      toast.success(data.message, "Register Successfully");

      localStorage.setItem("token", data.token);

      setIsLoading(false);

      navigate("/home");

      saveToken(data.token);

    } catch (error) {

      toast.error(error?.response?.data?.error || "Something went wrong");

      setIsLoading(false);
    }


  }


  const { register,
    handleSubmit,
    formState: { errors, touchedFields } } =
    useForm({
      defaultValues: {

        email: "",
        password: "",

      },
      resolver: zodResolver(schema)
    });








  return (
    <section className='my-10 mx-auto p-10 bg-slate-100 dark:bg-base-100  rounded-md md:w-[50%] w-[80%] shadow-xl shadow-gray-300 dark:shadow-gray-400/10'>
      <h1 className=' mb-10 md:text-4xl text-2xl font-semibold !text-blue-600  dark:!text-slate-100'>Login Now</h1>

      <form onSubmit={handleSubmit(SendData)}>

        {/* Email Input */}
        <input type="email" placeholder="Typr your email..." id='email' className="input dark:bg-base-100 bg-transparent !text-black dark:!text-slate-100  input-neutral border-gray-400 w-full mb-4"
          {...register('email')}
        />

        {touchedFields?.email && errors?.email && (<p className='text-red-700  mb-4'>{errors?.email?.message}</p>)}


        {/* Password Input */}
        <div className='relative'>
          <input type={showPassword ? "text" : "password"} placeholder="Typr your password..." id='password' className="input dark:bg-base-100 bg-transparent !text-black dark:!text-slate-100  input-neutral border-gray-400 w-full mb-4"
            {...register('password')}
          />

          <button className='absolute right-5 cursor-pointer  top-5 transform -translate-y-1/2 !text-gray-800 dark:!text-white' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <i className="fa-regular fa-eye "></i> : <i className="fa-regular fa-eye-slash"></i>}</button>
        </div>
        {touchedFields?.password && errors?.password && (<p className='text-red-700  mb-4'>{errors?.password?.message}</p>)}


        <button type='submit' className="btn rounded-xl !bg-[#114ccb] !text-slate-100   dark:!bg-gray-50 dark:!text-blue-600 border-transparent  mt-4 md:text-[14px] text-[12px] "
          disabled={isLoading}>
          {isLoading ?  <Icon icon="line-md:loading-alt-loop" width="24" height="24" />: "Signin"}
        </button>

        <div>
          <p className='text-stone-600 mt-4 md:text-[14px] text-[12px] font-semibold dark:text-slate-100'>Not registered? <span className='text-blue-600 cursor-pointer' onClick={() => navigate("/register")}>Create account</span> </p>
        </div>
      </form>
    </section >
  )
}

export default Login;

