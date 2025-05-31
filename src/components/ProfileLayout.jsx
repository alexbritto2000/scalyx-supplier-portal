import React from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
    return (
        <div className='flex flex-row flex-1'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default ProfileLayout