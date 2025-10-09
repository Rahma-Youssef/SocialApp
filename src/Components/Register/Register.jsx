import React, { useContext, useState } from 'react'
import Style from './Register.module.css'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../IsLoadingStateContext/IsLoadingStateContext';
import { Label, Radio } from 'flowbite-react';
import { Icon } from '@iconify-icon/react';

const Register = () => {
  useState()
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();



  const schema = z.object({
    name: z.string().min(2, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    email: z.email("Email is not valid"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include: - One uppercase letter (A-Z) - One lowercase letter (a-z) - One number (0-9) - One special character (#?!@$%^&*-)"),
    rePassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and include: - One uppercase letter (A-Z) - One lowercase letter (a-z) - One number (0-9) - One special character (#?!@$%^&*-)"),
    dateOfBirth: z.coerce.date()
      .refine((value) => {
        const currentYear = new Date().getFullYear();
        const userYear = value.getFullYear();
        return currentYear - userYear >= 18;
      }, "You must be at least 18 years old to register"),

    gender: z.enum(["male", "female"], "Gender is required")

  }).refine((values) => values.password === values.rePassword, {
    error: "password do not match",
    path: ["rePassword"]
  });




  async function SendData(values) {
    setIsLoading(true);

    try {
      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", values);

      toast.success(data.message, "Register Successfully");

      setIsLoading(false);

      navigate("/login");

    } catch (error) {

      toast.error(error?.response?.data?.error || "Something went wrong");

      setIsLoading(false);
    }


  }






  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: ""
    },
    resolver: zodResolver(schema)
  });





  return (
    <section className='my-10 mx-auto p-10 rounded-md !bg-slate-100 dark:!bg-gray-800 md:w-[50%] w-[80%] shadow-xl shadow-gray-300 dark:shadow-gray-400/10'>
      <h1 className=' mb-10 md:text-4xl text-2xl text-blue-600 dark:!text-slate-100 font-semibold'>Register Now</h1>

      <form onSubmit={handleSubmit(SendData)} className='!text-black dark:!text-slate-100 '>

        {/* Name Input */}
        <div>
          <input type="text" placeholder="Typr your name..." id='name' className="input dark:bg-base-100 bg-transparent input-neutral border-gray-400 w-full mb-4 "
            {...register('name')}
          />
          {touchedFields?.name && errors?.name && (<p className='text-red-700  mb-4 ms-4 text-sm'>{errors?.name?.message}</p>)}
        </div>

        {/* Email Input */}
        <div>
          <input type="email" placeholder="Typr your email..." id='email' className="input dark:bg-base-100 bg-transparent input-neutral border-gray-400 w-full mb-4"
            {...register('email')}
          />

          {touchedFields?.email && errors?.email && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.email?.message}</p>)}
        </div>


        {/* Password Input */}
        <div className='relative'>
          <input type={showPassword ? "text" : "password"} placeholder="Typr your password..." id='password' className="input dark:bg-base-100 bg-transparent input-neutral border-gray-400 w-full mb-4"
            {...register('password')}
          />
          <button className='absolute right-5 cursor-pointer  top-5 transform -translate-y-1/2 !text-gray-800 dark:!text-white' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <i className="fa-regular fa-eye "></i> : <i className="fa-regular fa-eye-slash"></i>}</button>


          {touchedFields?.password && errors?.password && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.password?.message}</p>)}

        </div>

        {/*  rePassword Input */}
        <div className='relative'>
          <input type={showPassword ? "text" : "password"} placeholder="confirm password" id='rePassword' className="input dark:bg-base-100 bg-transparent input-neutral border-gray-400 w-full mb-4"
            {...register('rePassword')}
          />
                    <button className='absolute right-5 cursor-pointer  top-5 transform -translate-y-1/2 !text-gray-800 dark:!text-white' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <i className="fa-regular fa-eye "></i> : <i className="fa-regular fa-eye-slash"></i>}</button>


          {touchedFields?.rePassword && errors?.rePassword && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.rePassword?.message}</p>)}

        </div>


        {/*  DataOfBirth Input */}
        <div>
          <input type="date" placeholder="Select date" id='dataOfBirth' className="input dark:bg-base-100 bg-transparent input-neutral border-gray-400 text-gray-500 dark:text-slate-50/35 w-full mb-4"
            {...register('dateOfBirth')}
          />

          {touchedFields?.dateOfBirth && errors?.dateOfBirth && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.dateOfBirth?.message}</p>)}

        </div>

        {/* Radio Input */}
        <div>
          <div className='flex gap-4 py-2'>

            <div className="flex items-center gap-2  cursor-pointer">
              <Radio id="male" name="gender" value="male" className='!bg-slate-100 dark:!bg-gray-600  cursor-pointer '  {...register('gender')} />
              <Label htmlFor="male" className="label  text-black dark:text-slate-100 font-medium">Male</Label>
            </div>

            <div className="flex items-center gap-2  cursor-pointer">
              <Radio id="female" name="gender" value="female" className=' !bg-slate-100 dark:!bg-gray-600  cursor-pointer'  {...register('gender')} />
              <Label htmlFor="female" className="label  text-black dark:text-slate-100 font-medium">Female</Label>
            </div>


          </div>

          {touchedFields?.gender && errors?.gender && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.gender?.message}</p>)}
        </div>


        <button type='submit' className="btn rounded-lg !bg-[#114ccb] !text-[#ffffff]  dark:!bg-gray-50  dark:!text-blue-600 border-transparent mt-5 "
          disabled={isLoading}
        >
          {isLoading ? <Icon icon="eos-icons:bubble-loading" width="24" height="24" /> : "Signup"}
        </button>

      </form>
    </section >
  )
}

export default Register