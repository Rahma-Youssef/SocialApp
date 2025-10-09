import React from 'react'
import Style from './Profile.module.css'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AddPost from '../AddPost/AddPost';
import Post from '../Post/Post';
import IsLoading from '../IsLoading/IsLoading';
import { useEffect } from 'react';


const Profile = () => {
  const token = localStorage.getItem("token");
  const { user: loggedUserId } = jwtDecode(token);



  function getUserPosts() {

    return axios.get(`https://linked-posts.routemisr.com/users/${loggedUserId}/posts`, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
  }


  const { data, isLoading } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts
  })



  useEffect(() => {
    document.title = `Profile-${data?.data?.posts[0]?.user.name}`;
  }, [data]);


  if (isLoading) {
    return <div className='h-screen flex justify-center items-center' >
      <IsLoading></IsLoading>
    </div>
  }





  return (
    <section className='  md:w-2/3 lg:w-1/2 p-5 my-4 mx-auto'>

      <div className="mb-5 text-center">
        <AddPost></AddPost>
      </div>

      {data?.data?.posts.map((post, index) => <Post key={index} post={post}></Post>)}
    </section>
  )
}

export default Profile