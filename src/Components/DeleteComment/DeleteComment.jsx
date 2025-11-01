import React from 'react'
import Style from './DeleteComment.module.css'
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const DeleteComment = ({ commentId ,postId}) => {
  let query = useQueryClient();

  async function handleDeleteComment(value) {
    console.log(value);

    return axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
      headers: {
        token: localStorage.getItem("token")

      }
    })
      .then((res) => {
        console.log(res)
        if (res.data.message === 'success') {
          toast.success(res.data.message, "Comment deleted Successfully");
         query.invalidateQueries({ queryKey: ['post', postId] });
          
        }


      })
      .catch((error) => {
        console.log(error)
        toast.error(error?.response?.data?.error || "Something went wrong");

      }
      )
  }
  return (
    <div onClick={handleDeleteComment}>Delete</div>
  )
}

export default DeleteComment