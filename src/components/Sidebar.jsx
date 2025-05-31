import React from 'react'
import './Components.scss'
import { Link, useLocation } from 'react-router-dom';
import userIcon from '../assets/user.svg';
import passwordLock from '../assets/password-lock.svg';
import calendarLock from '../assets/calendar.svg';

const CustomLink = ({ href, title, icon, className = "" }) => {
    const location = useLocation();

    return (
        <Link
            to={href}
            className={`${className} sidebar-nav text-[1rem] font-normal rounded-[0.75rem] hover:bg-[#F2F6F6] p-3 flex items-center gap-2 relative min-w-[16rem] ${location.pathname === href ? "bg-[#F2F6F6] shadow-[inset_0_0_4px_0_rgba(51,74,95,0.12)]" : ""
                }`}
        >
            {icon && <img src={icon} alt={`${title} icon`} className="w-5 h-5" />}
            {title}
        </Link>
    );
};


const Sidebar = () => {
    return (
        <div className='sidebar-card px-4 py-8'>
            <div className='text-[1.5rem] font-medium pb-[1.5rem]'> 
                Profile Settings
            </div>

            <div className='border-b border-[#3395B3] mb-6' />

            {/* <div>
                Profile
            </div> */}

            <nav className="flex flex-col items-center w-full gap-2">
                <CustomLink href="/profile-settings" title="Profile" icon={userIcon} />
                <CustomLink href="/password" title="Password" icon={passwordLock} />
                <CustomLink href="/sessions" title="Sessions" icon={calendarLock} />
            </nav>
        </div>
    )
}

export default Sidebar