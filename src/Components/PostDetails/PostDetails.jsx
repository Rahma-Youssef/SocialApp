import React, { useEffect } from 'react'
import Style from './PostDetails.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';


const PostDetails = () => {
  const { id } = useParams();

  function getSinglePost() {


    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token")
        }
      });

  }


  const { data, isLoading } = useQuery({
    queryKey: ['post' , id],
    queryFn: getSinglePost,
     refetchOnMount: false,
 


  })



  if (isLoading) {
    return <div className='h-screen flex justify-center items-center' >
      <i className='fa fa-spin fa-spinner text-8xl'></i>
    </div>
  }

  useEffect(() => {
    document.title = `Post Details - ${data?.data?.post?.user?.name}`;
  }, [data]);

  return (
    <section className='  md:w-2/3 lg:w-1/2 p-5 my-4 mx-auto !text-black dark:text-white'>

      <Post post={data?.data.post} isPostDetails={true}></Post>
    </section>
  )
}

export default PostDetails