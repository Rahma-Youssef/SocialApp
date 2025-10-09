import React from 'react'
import Style from './PostHeader.module.css'
import { jwtDecode } from 'jwt-decode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostHeader = ({ UserName, UserImg, createAt, userPostId, postId }) => {

  const token = localStorage.getItem("token");
  const { user: loggedUserId } = jwtDecode(token);


  function handleDeletePost() {


    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    });

  }

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: (data) => {

      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });


    },
    onError: (error) => {
      console.log("Error deleting post:", error);
    }
  });


  return (
    <div className='flex justify-between items-center !text-black dark:!text-white '>
      <div className='flex gap-3'>
        <div>
          <div className="avatar">
            <div className="w-12 rounded-full">
              {loggedUserId === userPostId ? <Link to="/profile"> <img src={UserImg} /> </Link> :
                <img src={UserImg} />}

            </div>
          </div>
        </div>


        <div>
          {loggedUserId === userPostId ? <Link to="/profile"><h4 className='sm:text-sm  md:text-xl'>{UserName}</h4></Link> :
            <h4 className='sm:text-sm  md:text-xl'>{UserName}</h4>}
          <p>{createAt}</p>
        </div>
      </div>

      {userPostId === loggedUserId &&
        <div>
          <details className="dropdown ">
            <summary className="btn bg-transparent outline-0 border-0 m-1 "><i className="fa-solid fa-ellipsis"></i></summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><button onClick={mutate}>{isPending ? "Deleting..." : "Delete"}</button></li>
              <li><button>Update</button></li>
            </ul>
          </details>
        </div>

      }
    </div>
  )
}

export default PostHeader