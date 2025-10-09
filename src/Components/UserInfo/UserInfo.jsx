import React from 'react'
import Style from './UserInfo.module.css'

const UserInfo = ({UserName , UserImg , createAt}) => {
  return ( 
    <div className='flex justify-between items-center  !text-black dark:text-white '>
      <div className='flex gap-3'>
        <div>
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={UserImg} />
            </div>
          </div>
        </div>


        <div>
          <h4 className='sm:text-sm  md:text-xl '>{UserName}</h4>
          <p>{createAt}</p>
        </div>
      </div>

      <div>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  )
}

export default UserInfo