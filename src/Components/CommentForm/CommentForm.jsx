


import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoadingContext } from '../IsLoadingStateContext/IsLoadingStateContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentForm = ({ postId, editingComment, setEditingComment }) => {
  const [comment, setComment] = useState('');
  const { setIsLoading } = useContext(LoadingContext);
  const queryClient = useQueryClient();


  useEffect(() => {
    if (editingComment) {
      setComment(editingComment.content);
    }
  }, [editingComment]);


  const addMutation = useMutation({
    mutationFn: () => axios.post(
      `https://linked-posts.routemisr.com/comments`,
      { content: comment, post: postId },
      { headers: { token: localStorage.getItem("token") } }
    ),
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      setComment('');
    },
    onError: (err) => toast.error(err.response?.data?.error || "Error")
  });

  // تحديث كومنت
  const updateMutation = useMutation({
    mutationFn: () => axios.put(
      `https://linked-posts.routemisr.com/comments/${editingComment._id}`,
      { content: comment },
      { headers: { token: localStorage.getItem("token") } }
    ),
    onSuccess: (data) => {
      toast.success('Comment updated successfully');
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      setEditingComment(null);
      setComment('');
    },
    onError: (err) => toast.error(err.response?.data?.error || "Error updating comment")
  });

  const handleSubmit = () => {
    if (editingComment) {
      updateMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <div className="join mt-7 gap-2 !w-full bg-slate-200/70 dark:bg-base-300/25 p-4 rounded-md">
      <div className='!w-full'>
        <label className="input p-0 !w-full join-item !bg-slate-100 dark:!bg-slate-200 border-2 border-slate-300 rounded-md">
          <input
            type="text"
            placeholder="Your comment..."
            required
            className='!w-full focus:ring-0 focus:border-gray-300 !text-black'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button
        className="bg-transparent text-blue-600 w-10 md:text-lg text-sm cursor-pointer rotate-45 join-item"
        onClick={handleSubmit}
      >
        {(addMutation.isPending || updateMutation.isPending)
          ? <i className='fa fa-spin fa-spinner text-xl'></i>
          : <i className="fas fa-paper-plane"></i>}
      </button>
    </div>
  );
};

export default CommentForm;
