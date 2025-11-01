import React, { useState } from 'react'
import Style from './UploadProfilePhoto.module.css'
import { Button, Checkbox, FileInput, HelperText, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const UploadProfilePhoto = () => {
  const [openModal, setOpenModal] = useState(false);


  function onCloseModal() {
    setOpenModal(false);

  }


  async function handleUploadPhoto(values) {
    console.log(values);
    let myPhoto = new FormData();
    myPhoto.append("photo", values.photo[0]);

    axios.put("https://linked-posts.routemisr.com/users/upload-photo", myPhoto,
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    ).then((res) => {
      console.log(res);
      if (res.data.message === 'success') {
      
        toast.success(res.data.message, "Photo Updated Successfully");
        setOpenModal(false);
      }
  
    })
      .catch((err) => {
        console.log(err.response.data.erorr);
        toast.error(err || "Something went wrong");

      });

  }

  const { register,
    handleSubmit,

    formState: { errors, touchedFields } } =
    useForm({
      defaultValues: {
        photo: "",

      },
      // resolver: zodResolver(schema)
    });

  return (
    <div>
      <div onClick={() => setOpenModal(true)} className='cursor-pointer flex items-center justify-center dark:!bg-white !bg-gray-900  absolute -bottom-2 -right-2  rounded-full w-5 h-5 p-2' >
        <i className="fa-solid fa-image text-[12px] dark:!text-gray-900 !text-white"></i>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader className='!bg-slate-50 rounded-t-lg' />
        <ModalBody className='!bg-slate-50   rounded-b-lg pb-8'>
          <div className="space-y-6">
            <h3 className="md:text-xl font-bold text-blue-600">Upload profile photo</h3>
            <form className="space-y-5" onSubmit={handleSubmit(handleUploadPhoto)}>
              <div>

                <Label className="mb-2 block" htmlFor="photo">
                  Upload file
                </Label>
                <FileInput
                  type='file'
                  id="photo"
                  {...register("photo")}
                  required
                  className={`${Style.customFileInput}`}

                />


              </div>




              <Button type='submit' className='bg-blue-600  cursor-pointer ms-auto'>Save</Button>


            </form>

          </div>
        </ModalBody>
      </Modal>

    </div >
  )
}

export default UploadProfilePhoto