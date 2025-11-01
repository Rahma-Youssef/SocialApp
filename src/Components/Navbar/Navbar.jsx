import React, { use, useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Style from './Navbar.module.css'
import { authContext } from '../AuthContextProvider/AuthContextProvider';
import DarkMood from '../DarkMood/DarkMood';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Navbar as FlowNavbar } from 'flowbite-react';
import useUserData from '../Utils/getUserData';
import ChangePassword from '../ChangePassword/ChangePassword';
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto';

const Navbar = () => {
    const { token, removeToken: contextLogout } = useContext(authContext);
    const { data, isLoading, error } = useUserData();
    const [openModal, setOpenModal] = useState(false);

    const Navigate = useNavigate();

    function logout() {
        contextLogout();
        Navigate("/login");
    }
    return (
        <>
            <FlowNavbar className=' fixed top-0 left-0 right-0 z-10   bg-slate-100  dark:bg-base-300    md:px-20 px-0 py-5  dark:shadow-white/5  shadow-xl'>
                <div className="w-[90%] mx-auto flex justify-between" >
                    <NavbarBrand >
                        {token ? <Link to="/" className=" md:text-4xl text-xl !text-blue-600 font-semibold  dark:!text-slate-100 text-center">Linked Posts</Link> :
                            <Link to="/login" className=" md:text-4xl text-xl !text-blue-600 font-semibold  dark:!text-slate-100 text-center">Linked Posts</Link>}
                    </NavbarBrand>
                    <div className="flex items-center gap-5">
                        {token ? (<>
                            <div className='relative'>
                                <Dropdown

                                    arrowIcon={false}
                                    inline
                                    label={
                                        <div tabIndex={0} role="button" className="btn btn-circle avatar relative border-0">
                                            {isLoading ? <div className="w-20  rounded-full animate-pulse bg-gray-100 *:"></div> : <div className="w-20  rounded-full ">
                                                <img

                                                    alt="avatar"
                                                    src={data?.photo} />


                                            </div>}
                                        </div>

                                    }
                                >

                                    <DropdownHeader>
                                        <span className="block text-sm">{data?.name}</span>
                                        <span className="block truncate text-sm font-medium">{data?.email}</span>
                                    </DropdownHeader>
                                    <DropdownItem className="!bg-transparent hover:!bg-transparent"><Link to="/profile" >Profile</Link></DropdownItem>

                                    <DropdownItem
                                        onClick={() => {
                                            setOpenModal(true);
                                        }}
                                        className="!bg-transparent hover:!bg-transparent pt-0 "
                                    >
                                        Change Password
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem onClick={logout} className="!bg-transparent hover:!bg-transparent">Sign out</DropdownItem>
                                </Dropdown>

                                <ChangePassword open={openModal} onClose={() => setOpenModal(false)} />
                                <UploadProfilePhoto />
                            </div>

                        </>) : (<Link to="/login" className='md:text-xl text-lg !text-blue-600 dark:!text-white font-medium hover:scale-95 active:scale-95'> Login</Link >)
                        }

                        <DarkMood></DarkMood>
                    </div>

                </div>
            </FlowNavbar>

        </>
    )
}

export default Navbar