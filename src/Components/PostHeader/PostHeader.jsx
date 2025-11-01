import React, { useEffect, useRef } from 'react';
import Style from './PostHeader.module.css';
import { jwtDecode } from 'jwt-decode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { handleCreateAt } from '../Utils/formDate';
import UpdatePosts from '../UpdatePosts/UpdatePosts';

const PostHeader = ({ UserName, UserImg, createAt, userPostId, postId }) => {
  const token = localStorage.getItem("token");
  const { user: loggedUserId } = jwtDecode(token);
  const queryClient = useQueryClient();
  const dropdownRef = useRef(null);

  function handleDeletePost() {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: { token: localStorage.getItem("token") },
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userPosts'] }),
    onError: (error) => console.log("Error deleting post:", error),
  });


  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dropdownRef.current.removeAttribute("open");
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className='flex justify-between items-center !text-black dark:!text-white'>
      <div className='flex gap-3'>
        <div className="avatar">
          <div className="w-12 rounded-full">
            {loggedUserId === userPostId ? (
              <Link to="/profile"><img src={UserImg} /></Link>
            ) : (
              <img src={UserImg} />
            )}
          </div>
        </div>
        <div>
          {loggedUserId === userPostId ? (
            <Link to="/profile"><h4 className='sm:text-sm md:text-xl'>{UserName}</h4></Link>
          ) : (
            <h4 className='sm:text-sm md:text-xl font-medium'>{UserName}</h4>
          )}
          <p className='text-sm mt-1 font-medium !text-gray-700 dark:!text-slate-200'>
            {handleCreateAt(createAt)}
          </p>
        </div>
      </div>

      {userPostId === loggedUserId && (
        <div>
          <details ref={dropdownRef} className="dropdown">
            <summary className="btn bg-transparent shadow-none text-xl outline-0 border-0 m-1 !text-gray-800 dark:!text-white">
              <i className="fa-solid fa-ellipsis"></i>
            </summary>
            <ul className="menu dropdown-content rounded-box z-1 w-52 p-2 shadow-sm shadow-gray-500 !bg-white dark:!bg-gray-800">
              <li>
                <button
                  onClick={() => {
                    mutate();
                    dropdownRef.current?.removeAttribute("open");
                  }}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById(`update_modal_${postId}`).showModal()}>Update</button>

              </li>
            </ul>
          </details>

          <UpdatePosts
            postId={postId}
            modalId={`update_modal_${postId}`}
            handleClose={() => document.getElementById(`update_modal_${postId}`).close()}
          />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
