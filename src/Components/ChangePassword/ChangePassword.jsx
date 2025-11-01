import React from 'react'
import Style from './ChangePassword.module.css'
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';


const ChangePassword = ({ open, onClose }) => {




  const schema = z.object({
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain at least one letter and one number"),
    newPassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain at least one letter and one number"),


  })

  async function handleChangePassword(values) {
    //  console.log(values);
    axios.patch("https://linked-posts.routemisr.com/users/change-password", values,
      {

        headers: {
          token: localStorage.getItem("token")
        }
      }
    ).then((res) => {
      console.log(res);
      if (res.data.message === 'success') {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message, "Password Updated Successfully");
      }
    })
      .catch((err) => {
        
        toast.error(err.response.data.error || "Something went wrong");

      });

  }

  const { register,
    handleSubmit,

    formState: { errors, touchedFields } } =
    useForm({
      defaultValues: {

        password: "",
        newPassword: "",

      },
      resolver: zodResolver(schema)
    });

  return (
    <>
      {/* <Button className='text-[14px] text-slate-100 font-normal  cursor-pointer active:border-none focus:shadow-none  active:outline-none focus:outline-none bg-blue-500'>Change Password</Button> */}
      <Modal show={open} size="md" onClose={onClose} popup>
        <ModalHeader className='!bg-slate-50 rounded-t-lg' />
        <ModalBody className='!bg-slate-50   rounded-b-lg pb-8'>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-600">Change Password</h3>
            <form className="space-y-5" onSubmit={handleSubmit(handleChangePassword)}>
              <div>
                <div className="mb-2 block ">
                  <Label htmlFor="password" className='!text-gray-900'>old Password</Label>
                </div>
                <TextInput
                  type='password'
                  id="password"
                  placeholder="Old Password"
                  {...register("password")}
                  required
                  theme={{
                    field: {
                      input: {
                        base: "!bg-white border !border-gray-400 !text-gray-900 focus:!ring-gray-300 focus:!border-gray-500", // الخلفية هنا
                      },
                    },
                  }}
                />
                {touchedFields?.password && errors?.password && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.password?.message}</p>)}

              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newPassword" className='!text-gray-900'>New password</Label>
                </div>
                <TextInput type="password"
                  id="newPassword"
                  placeholder="New Password"
                  {...register("newPassword")}
                  required
                  theme={{
                    field: {
                      input: {
                        base: "!bg-white border !border-gray-400 !text-gray-900 focus:!ring-gray-300 focus:!border-gray-500", // الخلفية هنا
                      },
                    },
                  }}

                />
                {touchedFields?.password && errors?.password && (<p className='text-red-700  mb-4  ms-4 text-sm'>{errors?.password?.message}</p>)}

              </div>



              <Button type='submit' className='bg-blue-600  cursor-pointer w-full'>Reset password</Button>


            </form>

          </div>
        </ModalBody>
      </Modal></>
  )
}

export default ChangePassword