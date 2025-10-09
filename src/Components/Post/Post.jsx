import React from 'react'
import Style from './Post.module.css'
import UserInfo from '../UserInfo/UserInfo'
import { Link } from 'react-router-dom'

import PostHeader from '../PostHeader/PostHeader'
import CommentForm from '../CommentForm/CommentForm'



const Post = ({ post, isPostDetails }) => {
  return (<>
    <div className='p-5  !bg-slate-100  dark:!bg-gray-800  shadow-xl shadow-gray-300 dark:shadow-white/10 rounded-xl mt-7 '>

      {/* header */}
      <div className="header ">

        <PostHeader UserName={post?.user?.name}
          UserImg={post?.user?.photo}
          createAt={post?.createdAt}
          userPostId={post?.user?._id}
          postId={post?.id}
          />

      </div>


      {/* body */}
      <div className="body my-4">
        <p className='text-center '>{post?.body}</p>
        <img className='w-full mt-4' alt=""  loading='lazy'  src={post?.image} />

      </div>



      {/* comments */}
      {post?.comments.length === 0 ? <p>No comments yet</p> : null}

      {post?.comments.length > 0 && !isPostDetails ? (<div className="comments p-5 rounded-sm bg-slate-200 dark:bg-slate-800 border-2 border-slate-200/20 ">

        <Link to={`/postdetails/${post.id}`} className='text-center block text-blue-300 mb-2 cursor-pointer'>View All Comments</Link>

        <UserInfo UserName={post?.comments[0]?.commentCreator?.name}
          UserImg={post?.comments[0]?.commentCreator?.photo.includes("undefined") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s" : post?.comments[0]?.commentCreator?.photo}
          createAt={post?.comments[0]?.createdAt} />
        <p className='mt-4'> {post?.comments[0]?.content}</p>
      </div>
      ) : (
        <>
          {post?.comments && (
            <>
              {post?.comments.map((comment, index) => (
                <div key={index} className="comments p-5 rounded-sm bg-slate-500 border-2 border-slate-200/20 mt-4 ">
                  <UserInfo UserName={comment?.commentCreator?.name}
                    UserImg={comment?.commentCreator?.photo.includes("undefined") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s" : comment?.commentCreator?.photo}
                    createAt={comment?.createdAt} />
                  <p className='mt-4'> {comment?.content}</p>
                </div>
              ))}
            </>
          )}
        </>
      )}

     <CommentForm postId={post.id}></CommentForm>
    </div>

  </>
  )
}

export default Post