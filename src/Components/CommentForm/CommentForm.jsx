import React, { useContext, useState } from 'react'
import Style from './CommentForm.module.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LoadingContext } from '../IsLoadingStateContext/IsLoadingStateContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { data } from 'react-router-dom'


const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('')
  const { isLoading, setIsLoading } = useContext(LoadingContext);



  function createComment() {
    setIsLoading(true);
    const CommentData = {
      content: comment,
      post: postId
    }

    return axios.post(`https://linked-posts.routemisr.com/comments`, CommentData,
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    )
  }



  const queryClient = useQueryClient();

  const { mutate, isPending, } = useMutation({
    mutationFn: createComment,


    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ['post', postId], });
      setComment('');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response.data.error);
    }
  })



  return (
    <div className="join mt-7 gap-2 !w-full ">
      <div className='!w-full'>
        <label className="input !w-full join-item">

          <input type="text" placeholder="add comment" required className='!w-full ' value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>

      </div>

      <button className="btn btn-secondary join-item" onClick={mutate}>
        {isPending ? <i className='fa fa-spin fa-spinner text-xl'></i> : <i className="fas fa-paper-plane">
        </i>}
      </button>
    </div>

  )
}

export default CommentForm