import React, {useContext, useState} from 'react';
import noProfile from "../../assets/images/no-profile.jpg";
import {USER_PROFILE_MENU} from "../../utils/data.js";
import {Link} from "react-router-dom";
import {IoLogOutOutline} from "react-icons/io5";
import Overlay from "../../components/Overlay.jsx";
import NavbarButton from "./NavbarButton.jsx";
import {FaRegUser} from "react-icons/fa6";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavbarUserProfile(user) {
    const {logout} = useContext(AuthContext);
    const [showUserProfile, setShowUserProfile] = useState(false);

    const toggleUserProfile = () => {
        setShowUserProfile(prev => !prev);
    }

    return (
        <>
            {/* Icon */}
            <NavbarButton
                icon={FaRegUser}
                onClick={toggleUserProfile}
                haveZIndex={showUserProfile}
            />

            {/* Sub-menu */}
            <div
                className={`hidden md:block absolute shadow-md left-0 top-full w-[278px] bg-white dark:bg-primary-dark dark:text-white p-5 pb-3.5 rounded-lg transition ${
                    !showUserProfile ? 'opacity-0 invisible' : 'opacity-100 visible z-30'
                }`}
            >
                {/* Sub-menu header */}
                <div className="flex border-b border-gray-300 gap-x-4">
                    <div className="flex pb-3 mb-1">
                        <img
                            className="w-13 h-13 rounded-full"
                            src={noProfile}
                            alt="noProfile"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className="text-sm font-bold">{user.user.username}</span>
                        <span className="text-primary text-xs font-semibold">موجودی : 0تومان</span>
                    </div>
                </div>
                {/* Sub-menu list */}
                <ul className="border-b border-gray-300 pb-3 mb-1">
                    {USER_PROFILE_MENU.map((item) => (
                        <li key={item.id}>
                            <Link to={item.href}
                                  className="flex items-center gap-x-3 px-2.5 h-12 rounded-xl hover:text-white hover:bg-primary transition-colors"
                            >
                                <item.icon className="text-2xl"/>
                                <span className="text-base">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Sub-menu Footer */}
                <button
                    className="flex w-full items-center gap-x-3 px-2.5 h-12 rounded-xl hover:text-white hover:bg-red-500 transition-colors"
                    onClick={logout}
                >
                    <IoLogOutOutline className="text-2xl"/>
                    <span className="text-base">خروج</span>
                </button>
            </div>

            {/* Overlay */}
            {showUserProfile && (
                <Overlay
                    closeOverlay={toggleUserProfile}
                />
            )}
        </>
    );
}

export default NavbarUserProfile;