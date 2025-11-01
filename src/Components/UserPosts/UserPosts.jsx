import React from 'react'
import Style from './UserPosts.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Post from '../Post/Post';

const UserPosts = ({userId}) => {



   function getUserPosts() {

    return axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`, {
      headers: {
        token: localStorage.getItem("token")
      }

    });
  }



  const { data, isLoading } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
  })



  return (
    <div>  {data?.map((post, index) => <Post key={index} post={post} ></Post>)} </div>
  )
}

export default UserPosts