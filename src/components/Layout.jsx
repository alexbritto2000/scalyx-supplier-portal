import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='relative'>
            <div className="sticky top-0 z-50 bg-[#FBFFFF]" >
                <NavBar className="sticky top-0 z-50 bg-[#FBFFFF]" />
            </div>
            
            <Outlet />
        </div>
    )
}

export default Layout