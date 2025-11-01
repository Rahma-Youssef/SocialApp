import React from 'react'
import Style from './Post.module.css'
import UserInfo from '../UserInfo/UserInfo'
import { Link } from 'react-router-dom'

import PostHeader from '../PostHeader/PostHeader'
import CommentForm from '../CommentForm/CommentForm'



const Post = ({ post, isPostDetails }) => {


  return (<>
    <div className='p-5  !bg-slate-50  dark:!bg-gray-800  shadow-xl shadow-gray-300 dark:shadow-white/10 rounded-xl mt-7 '>

      {/* header */}
      <div className="header ">

        <PostHeader
          UserName={post?.user?.name}
          UserImg={post?.user?.photo}
          createAt={post?.createdAt}
          userPostId={post?.user?._id}
          postId={post?.id}

        />

      </div>


      {/* body */}
      <div className="body py-5">
        <p className=' font-medium md:text-lg text-sm !text-black dark:!text-slate-300'>{post?.body}</p>
        <img className='w-full mt-4 rounded-md' alt="" loading='lazy' src={post?.image} />
      </div>

      <Link to={`/postdetails/${post.id}`} className=' ms-3 font-semibold text-blue-900 dark:!text-slate-300 cursor-pointer'>show comments</Link>



      {/* comments */}

      {post?.comments.length === 0 ? <p >No comments yet</p> : null}
      {post?.comments.length > 0 && !isPostDetails ? (<div className="comments !text-gray-500 dark:!text-gray-300  font-medium mt-4 p-5 rounded-lg bg-slate-200/70 dark:bg-base-300/25 border-2 border-slate-200/20 ">


        <UserInfo
          UserName={post?.comments[0]?.commentCreator?.name}
          UserImg={post?.comments[0]?.commentCreator?.photo.includes("undefined") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s" : post?.comments[0]?.commentCreator?.photo}
          createAt={post?.comments[0]?.createdAt}
          commentId={post?.comments[0]?.id || post?.comments[0]?._id}
          postId={post?.id}
          commentUserId={post?.comments[0]?.commentCreator._id}

        />
        <p className='mt-4'> {post?.comments[0]?.content}</p>
      </div>
      ) : (
        <>
          {post?.comments && (
            <>
              {post?.comments.map((comment) => {


                return (
                  <div key={comment?.id || comment?._id} className='!text-gray-500 dark:!text-gray-300  font-medium mt-4 p-5 rounded-lg bg-slate-200/70 dark:bg-base-300/25 border-2 border-slate-200/20'>
                    <UserInfo
                      UserName={comment?.commentCreator?.name}
                    
                      UserImg={post?.user?.photo}
                      createAt={comment?.createdAt}
                      commentId={comment?.id || comment?._id}
                      userPostId={post?.user?._id}
                      postId={post?.id}
                      commentUserId={comment?.commentCreator._id}
                    />
                    <p className='pt-2 ps-2'>{comment?.content}</p>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}

      <CommentForm postId={post?.id} />

    </div>

  </>
  )
}

export default Post

