import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import scalyxLogo from '../assets/scalyx-logo.svg';
import notification from '../assets/notification.svg';
import DropDown from '../assets/dropdown.svg';
import ProfileSettings from '../assets/profile-settings.svg';
import LogoutIcon from '../assets/logout.svg';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@heroui/react";
import { cn } from "@heroui/react";

// Placeholder Icon Components (replace with your actual icons)
const TwitterIcon = () => <div className="w-5 h-5 bg-gray-400 rounded-sm" />;
const GithubIcon = () => <div className="w-5 h-5 bg-gray-400 rounded-sm" />;
const LinkedInIcon = () => <div className="w-5 h-5 bg-gray-400 rounded-sm" />;

const CustomLink = ({ href, title, notify, className = "" }) => {
    const location = useLocation();

    return (
        <Link
            to={href}
            className={`${className} text-[1rem] font-normal py-3 rounded-[0.75rem] hover:bg-[#F2F6F6] px-[1.25rem] relative ${location.pathname === href ? "bg-[#F2F6F6]" : ""
                }`}
        >
            {title}
            {notify === "1" && (
                <div className="bg-[#FF5D5D] rounded-full w-2 h-2 absolute top-4 right-2" />
            )}
        </Link>
    );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        toggle();
        navigate(href);
    };

    return (
        <button
            onClick={handleClick}
            className={`${className} relative group text-white my-2`}
        >
            {title}
            <span
                className={`h-[1px] inline-block bg-white absolute left-0 -bottom-0.5 
                   group-hover:w-full transition-[width] ease duration-300 
                   ${location.pathname === href ? "w-full" : "w-0"}`}
            />
        </button>
    );
};

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="w-full px-8 py-4 font-medium flex items-center justify-between relative z-10 md:px-6 sm:px-4 shadow-[0px_1px_14px_0px_#273C5B24]">
            {/* Mobile Menu Button */}
            <button
                className="flex-col justify-center items-center hidden lg:flex"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`bg-black block h-0.5 w-6 rounded-sm transition-all duration-300 
                        ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'}`} />
                <span className={`bg-black block h-0.5 w-6 rounded-sm my-1 transition-all duration-300 
                        ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`bg-black block h-0.5 w-6 rounded-sm transition-all duration-300 
                        ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'}`} />
            </button>

            {/* Desktop Navigation */}
            <div className="w-full flex justify-between items-center lg:hidden">
                <nav className="flex items-center">
                    {/* <CustomLink href="/" title="Home" className="mr-4" />
                    <CustomLink href="/about" title="About" className="mx-4" />
                    <CustomLink href="/projects" title="Projects" className="mx-4" /> */}
                    <img src={scalyxLogo} className="w-[7.125rem] cursor-pointer" />
                </nav>

                <nav className="flex items-center">
                    <CustomLink href="/dashboard" title="Dashboard" notify="0" />
                    <CustomLink href="/orders" title="Orders" notify="1" />
                    <CustomLink href="/shipping" title="Shipping" notify="0" />
                    <CustomLink href="/returns" title="Returns" notify="0" />
                    <CustomLink href="/invoices" title="Invoices" notify="0" />
                    <CustomLink href="/payments" title="Payments" notify="0" />
                    <CustomLink href="/intenvory" title="Inventory" notify="0" />
                    <CustomLink href="/work-order" title="Work Order" notify="0" />
                </nav>

                <div className="flex flex-row gap-[0.75rem]">
                    <img src={notification} />

                    <div className="flex justify-center">
                        <Popover placement="bottom-end" color="white" open={isPopOverOpen}
                            onOpenChange={(open) => setIsPopOverOpen(open)} className="bg-white">
                            <PopoverTrigger>
                                <div className="flex justify-center items-center cursor-pointer">
                                    <div className="bg-[#D2E9FE] rounded-full w-[2.5rem] h-[2.5rem] flex justify-center items-center text-[1.25rem]">
                                        A
                                    </div>
                                    <div className="pl-[5px]">
                                        <img
                                            src={DropDown}
                                            className={cn(
                                                "transition-transform duration-200 transform origin-center",
                                                isPopOverOpen ? "rotate-180" : "rotate-0"
                                            )}
                                            alt="Dropdown Icon"
                                        />
                                    </div>
                                </div>
                            </PopoverTrigger>

                            <PopoverContent>
                                <div className="py-[0.65rem] px-[0.55rem] flex flex-col justify-start items-start">
                                    <div className="text-[0.875rem] text-[#6E6E70] pb-[0.713rem] cursor-pointer">
                                        acmeinc@gmail.com
                                    </div>

                                    <div className="text-[0.875rem] text-[#22223B] pb-[0.713rem] flex justify-center gap-[5px] cursor-pointer">
                                        <img src={ProfileSettings} />
                                        Profile Settings
                                    </div>

                                    <div className="text-[0.875rem] text-[#9C0C0C] flex justify-center gap-[5px] cursor-pointer">
                                        <img src={LogoutIcon} />
                                        Log out
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 rounded-lg backdrop-blur-md py-16 z-50"
                >
                    <nav className="flex flex-col items-center">
                        <CustomMobileLink href="/" title="Home" toggle={toggleMenu} />
                        <CustomMobileLink href="/about" title="About" toggle={toggleMenu} />
                        <CustomMobileLink href="/projects" title="Projects" toggle={toggleMenu} />
                    </nav>

                    <nav className="flex items-center mt-8">
                        <motion.a
                            href="https://twitter.com"
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-5 mx-2"
                        >
                            <TwitterIcon />
                        </motion.a>
                        <motion.a
                            href="https://github.com"
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-5 mx-2"
                        >
                            <GithubIcon />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com"
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-5 mx-2"
                        >
                            <LinkedInIcon />
                        </motion.a>
                    </nav>
                </motion.div>
            )}

            {/* Logo Placeholder */}
            {/* <div className="absolute left-1/2 top-6 -translate-x-1/2">
                <div className="w-10 h-10 bg-gray-400 rounded-full" />
            </div> */}
        </header>
    );
};

export default NavBar;
