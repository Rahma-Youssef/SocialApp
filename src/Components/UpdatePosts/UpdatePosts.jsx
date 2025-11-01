import React, { useEffect, useRef, useState } from 'react'
import Style from './UpdatePosts.module.css'
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const UpdatePosts = ({ postId, handleClose , modalId }) => {
 const [viewImage, setViewImage] = useState(null);
  const [img, setImg] = useState("");
  const postContent = useRef("");
  const postImg = useRef("");
  const modalRef = useRef(null);
  const queryClient = useQueryClient();


  function resetForm() {
    postContent.current.value = '';
    setViewImage(null);
    setImg('');
    if (postImg.current) postImg.current.value = '';
  }

  function updatePost() {
    const formData = new FormData();
    if (postContent.current.value.trim() !== '') {
      formData.append('body', postContent.current.value);
    }
    if (img) {
      formData.append('image', img);
    }

    return axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
      headers: { token: localStorage.getItem("token") }
    });
  }

  function handleImgChange() {
    const file = postImg.current?.files[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setImg(file);
    setViewImage(src);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      toast.success('Post updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      resetForm(); 
      modalRef.current?.close();
      if (handleClose) handleClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.error || 'Something went wrong');
    },
  });


  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    modal.addEventListener('close', resetForm);
    return () => modal.removeEventListener('close', resetForm);
  }, []);
  return (
    <>

      <dialog id={modalId} ref={modalRef} className="modal">
        <div className="modal-box bg-slate-100 dark:bg-base-300">
          <h3 className="font-bold text-xl text-center !text-black dark:!text-white">Update Post</h3>


          {/* body Post */}
          <textarea placeholder="Write your thoughts here.." ref={postContent} className=" bg-slate-100 dark:!bg-gray-600 !text-black dark:!text-white textarea border-1 border-gray-300 dark:!border-gray-100   w-full mt-10 mb-4"></textarea>

          {/* image Post */}
          <i className='fa fa-xmark !text-gray-700 dark:!text-white ms-auto !block py-3 cursor-pointer ' onClick={handleClose}></i>
          {viewImage ? (<div><img src={viewImage} alt="" className='w-full rounded-xl' /></div>) : (
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer !bg-slate-100  dark:!bg-gray-600 transition-all duration-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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



          <div className="modal-action">
            <form method="dialog" className='flex items-center gap-4 me-auto'>
              <button className='btn bg-blue-700 border-gray-400 px-4 rounded-lg shadow-none' onClick={mutate}>{isPending ? <i className="fa fa-spinner fa-spin"></i> : "Update"}</button>

              <button className="btn bg-transparent border-gray-400 !text-black dark:!text-white rounded-lg shadow-none">Close</button>
            </form>
          </div>
        </div>
      </dialog>

    </>
  )
}

export default UpdatePosts