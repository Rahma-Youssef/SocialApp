import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Checkbox, FileInput, HelperText, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const UpdateCommentModal = ({ comment, commentId, onClose, open }) => {


  function onCloseModal() {
    onClose();
  }

  let query = useQueryClient();

  const { register, handleSubmit, isLoading, formState: { errors, touchedFields } } = useForm({
    defaultValues: {
      content: "",

    },

  });

  async function handleUpdateComment(value) {
    console.log(value);

    return axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, value, {
      headers: {
        token: localStorage.getItem("token")

      }
    })
      .then((res) => {
        console.log(res)
        toast.success(res.data.message, "Comment Updated Successfully");
        onCloseModal();

      })
      .catch((error) => {
        console.log(error)
        toast.error(error?.response?.data?.error || "Something went wrong");

      }
      )
  }


  return (
    <div>


      {/* <div onClick={() => setOpenModal(true)} className='text-[14px] dark:!text-white !text-gray-800 font-normal  cursor-pointer '>Update</div> */}
      <Modal show={open} size="md" onClose={onClose} popup>
        <ModalHeader className='!bg-slate-50 rounded-t-lg' />
        <ModalBody className='!bg-slate-50   rounded-b-lg '>
          <div className="space-y-5">
            <h3 className="md:text-xl font-bold text-blue-600">Update Comment</h3>
            <form className="" onSubmit={handleSubmit(handleUpdateComment)}>
              <div className="pb-2 ">


                <TextInput
                  id="updaytecomment"
                  placeholder="Your Comment..."
                  {...register("content")}
                  required
                  theme={{
                    field: {
                      input: {
                        base: "mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm !bg-white border !border-gray-400 !text-gray-900 focus:!ring-gray-300 focus:!border-gray-500", // الخلفية هنا
                      },
                    },
                  }} />
              </div>





              <div className="flex items-center gap-2 mt-2">
                <button className='btn bg-blue-700 border-gray-400 px-4 rounded-lg shadow-none' >{isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Update"}</button>

                <div className="btn bg-transparent border-gray-400 !text-black rounded-lg shadow-none" onClick={onCloseModal} >Cancel</div>
              </div>

            </form>

          </div>
        </ModalBody >
      </Modal >

    </div >
  );
};

export default UpdateCommentModal;
