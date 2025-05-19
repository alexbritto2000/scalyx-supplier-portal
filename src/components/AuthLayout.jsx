import React from 'react'
import AuthBanner from '../assets/auth-banner.svg';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='flex items-center'>
            <img src={AuthBanner} className='h-[100vh] w-[45%] object-cover' />

            <div className='w-[55%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout