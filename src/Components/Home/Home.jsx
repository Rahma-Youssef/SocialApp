import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import Post from '../Post/Post'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import AddPost from '../AddPost/AddPost'
import IsLoading from '../IsLoading/IsLoading'


const Home = () => {


  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50",
      {
        headers: {
          token: localStorage.getItem("token")
        }
      });
  }



  const { data, error, isLoading, isError, isFetching } = useQuery({
    queryKey: ['allposts'],
    queryFn: getAllPosts,
    refetchOnMount: false,
    retry: 1,

  })


  
  useEffect(() => {
    document.title = "SocialApp";
  }, []);

  console.log(data?.data?.posts[0].comments);
  




  if (isLoading) {
    return <IsLoading></IsLoading>
  }

  return (
    <>
      <section className='   md:w-2/3 lg:w-1/2 p-5 my-4 mx-auto '>
 

        <div className="mb-5 text-center">
          <AddPost></AddPost>
        </div>

        {data?.data?.posts.map((post, index) => <Post key={index} post={post} ></Post>)}
      </section>





    </>
  )
}




export default Home