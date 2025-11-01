
import React, { useEffect, useRef, useState } from 'react'
import { handleCreateAt } from '../Utils/formDate'
import UpdateCommentModal from '../UpdateCommentModal/UpdateCommentModal'
import DeleteComment from '../DeleteComment/DeleteComment'
import { jwtDecode } from 'jwt-decode'

const UserInfo = ({ UserName, UserImg, createAt, commentId, postId, userPostId, commentUserId }) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const { user: loggedUserId } = jwtDecode(token);



  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector('.update-comment-modal')


      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!modal || !modal.contains(event.target))
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleToggle = () => setIsOpen(!isOpen)
  const handleCloseDropdown = () => setIsOpen(false)

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-3'>
        <div className="avatar">
          <div className="w-9 rounded-full">
            <img src={commentUserId === loggedUserId ? UserImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"} alt="user" />
          </div>
        </div>

        <div className='flex md:flex-row flex-col items-center md:gap-4'>
          <h4 className='text-[12px] md:text-[16px] font-semibold !text-black dark:!text-white'>{UserName}</h4>
          <p className='!text-gray-500 dark:!text-gray-300 font-semibold text-[12px]'>{handleCreateAt(createAt)}</p>
        </div>
      </div>

      <div ref={dropdownRef} className="relative">
        {(commentUserId === loggedUserId || userPostId === loggedUserId) && (
          <button
            onClick={handleToggle}
            className="btn bg-transparent shadow-none text-xl outline-0 border-0 m-1 !text-gray-800 dark:!text-white"
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        )}


        {isOpen && (
          <ul className="absolute right-0 menu rounded-box z-10 w-52 p-2 shadow-sm shadow-gray-500 !bg-white dark:!bg-gray-800">
    
            {(commentUserId === loggedUserId || userPostId === loggedUserId) && (
              <li>
                <button onClick={handleCloseDropdown}>
                  <DeleteComment commentId={commentId} postId={postId} />
                </button>
              </li>
            )}

 
            {commentUserId === loggedUserId && (
              <li>
                <button onClick={() => setIsModalOpen(true)} >
                  Update
                </button>
              </li>
            )}
          </ul>
        )}
        <UpdateCommentModal
          commentId={commentId}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  )
}

export default UserInfo


