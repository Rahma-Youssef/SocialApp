import React, { useRef, useState } from 'react'
import Style from './AddPost.module.css'
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


const AddPost = () => {
  const [viewImage, setViewImage] = useState(null);
  const [img, setImg] = useState("");
  const postContent = useRef("");
  const postImg = useRef("");
  const queryClient = useQueryClient();



  function addPost() {
    const formData = new FormData();

    if (postContent.current.value != "") {

      formData.append("body", postContent.current.value);
    }

    if (img != "") {
      formData.append("image", img);
    }

    return axios.post("https://linked-posts.routemisr.com/posts", formData, {
      headers: {
        token: localStorage.getItem("token")
      }
    });



  }



  function handleImgChange() {
    const src = URL.createObjectURL(postImg.current?.files[0]);
    setImg(postImg.current?.files[0]);
    setViewImage(src);
  }

  function handleClose() {
    postImg.current = "";
    setViewImage(null);
    setImg(" ");
  }


  const { mutate, isPending } = useMutation({
    mutationFn: addPost,

    onSuccess: (data) => {

      postContent.current.value = " ";
      handleClose();
      toast.success(data.data.message);

      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      document.getElementById('my_modal_1').close()



    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response.data.error);
    }
  })
  return (
    <>
      


       <div className='!bg-slate-100 dark:!bg-gray-800 rounded-xl flex items-center py-10 mx-auto'>
         <input type="text" className="input bg-transparent  border-2 border-gray-400 rounded-3xl w-[90%] mx-auto" placeholder="What's on your mind" list="browsers" onClick={() => document.getElementById('my_modal_1').showModal()}/>
       </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Post</h3>



          {/* body Post */}
          <textarea placeholder="Add Post" ref={postContent} className="textarea textarea-secondary w-full mt-10 mb-4"></textarea>

          <i className='fa fa-xmark text-white ms-auto !block py-3 cursor-pointer ' onClick={handleClose}></i>
          {viewImage ? (<div><img src={viewImage} alt="" className='w-full rounded-xl' /></div>) : (
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" ref={postImg} onChange={handleImgChange} />
              </label>
            </div>)
          }
          {/* image Post */}








          <button className='btn btn-secondary mt-5' onClick={mutate}>{isPending ? <i className="fa fa-spinner fa-spin"></i> : "Create"}</button>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">cancel</button>
            </form>
          </div>
        </div>
      </dialog>

    </>
  )
}

export default AddPost