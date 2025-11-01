import React from 'react'
import Style from './Profile.module.css'
import AddPost from '../AddPost/AddPost';
import Post from '../Post/Post';
import IsLoading from '../IsLoading/IsLoading';
import { useEffect } from 'react';
import UserPosts from '../UserPosts/UserPosts';
import useUserData from '../Utils/getUserData';
import ChangePassword from '../ChangePassword/ChangePassword';


const Profile = () => {
  const token = localStorage.getItem("token");


  const { data, isLoading, error } = useUserData();
  // console.log(data);
  


  useEffect(() => {
    document.title = `Profile-${data?.name}`;
  }, [data]);


  if (isLoading) {
    return <div className='h-screen flex justify-center items-center' >
      <IsLoading></IsLoading>
    </div>
  }








  return (
    <section className='  md:w-2/3 lg:w-1/2 p-5 my-4 mx-auto'>
      <div className="mb-5 text-center">
        <AddPost userName={data?.name} ></AddPost>
      </div>

      <div className='!bg-white dark:!bg-gray-800 border-1 border-gray-300 rounded-md flex flex-col px-5 md:py-10 py-5 items-center justify-center gap-3 mb-5 '>
        <div className="avatar">
          <div className="md:!w-30 !w-16 dark:!bg-white !bg-gray-800 rounded-full">
            <img src={data?.photo} alt='personal photo' />
          </div>
        </div>
        <h2 className='md:text-3xl font-semibold !text-black dark:!text-white'>{data?.name}</h2>
      </div>

      <ChangePassword></ChangePassword>

      <UserPosts userId={data?._id} ></UserPosts>

    </section>
  )
}

export default Profile