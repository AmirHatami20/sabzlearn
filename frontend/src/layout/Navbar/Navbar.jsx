import {useCallback, useContext, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

import {BsMoon, BsSun} from "react-icons/bs";
import {HiOutlineUser} from "react-icons/hi2";
import {LiaAngleLeftSolid} from "react-icons/lia";

import logo from '../../assets/images/logo.png';
import {API_PATHS} from "../../utils/apiPaths.js";

import NavbarButton from "./NavbarButton.jsx";
import NavbarUserBasket from "./NavbarUserBasket.jsx";
import NavbarUserProfile from "./NavbarUserProfile.jsx";
import NavbarMobile from "../MobilePanels/NavbarMobile.jsx";
import NavbarSearch from "./NavbarSearch.jsx";

import {useTheme} from "../../context/ThemeContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useAxios} from "../../hooks/useAxios.js";


function Navbar() {
    const {isLoginIn, userInfos, loading} = useContext(AuthContext);
    const {theme, setTheme} = useTheme();
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const {request} = useAxios();

    const isActive = useCallback(
        (path) => location.pathname === path,
        [location.pathname]
    );

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    useEffect(() => {
        request({
            method: "GET",
            url: API_PATHS.CATEGORY.GET_ALL,
        }).then((res) => {
            setCategories(res.data);
        })
    }, []);

    const renderCategoryDropdown = () => (
        <li className="relative group/sub-menu">
            <span tabIndex="0" className="group-hover/sub-menu:text-sky-500 cursor-pointer">
                دوره‌های آموزشی
            </span>
            <div
                className="invisible opacity-0 translate-y-2 group-hover/sub-menu:visible group-hover/sub-menu:opacity-100 group-hover/sub-menu:translate-y-0 transition-all duration-200 ease-in-out bg-white dark:bg-primary-dark absolute right-0 top-full pt-9 z-30"
            >
                <ul className="relative w-44 text-sm font-danaMedium rounded-b">
                    {categories.map((category) => (
                        <li className="group" key={category._id}>
                            <Link
                                to={`/course-cat/${category.name}`}
                                className="flex items-center justify-between py-3 pr-3 pl-2.5 border-l-2 border-l-transparent group-hover:bg-sky-500/10 group-hover:text-sky-500 group-hover:border-l-sky-500 transition-all dark:text-white"
                            >
                                {category.title}
                                <LiaAngleLeftSolid className="text-xs"/>
                            </Link>
                            {category.courses.length > 0 && (
                                <ul
                                    className="group-hover:flex hidden flex-col h-full gap-y-3 w-56 pr-4 pl-2 absolute right-full top-0 bg-zinc-50 dark:bg-secendery-dark dark:text-white overflow-y-auto border-y-[10px] border-l-8 border-transparent font-dana-light app-scrollbar"
                                >
                                    {category.courses.map((course) => (
                                        <li
                                            key={course._id}
                                            className="text-sm hover:text-primary"
                                        >
                                            <Link to={`/course/${course.shortName}`}>
                                                {course.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );

    return (
        <div className="text-gray-900 bg-white dark:bg-primary-dark dark:text-white">
            <div className="flex items-center justify-between h-20 md:h-25 px-4 sm:px-12">
                {!loading && (
                    <>
                        {/* Mobile Menu */}
                        <div className="flex lg:hidden">
                            <NavbarMobile
                                categories={categories}
                                themeIcon={theme === "light" ? BsMoon : BsSun}
                                toggleTheme={toggleTheme}
                            />
                        </div>

                        {/* Desktop Nav */}
                        <nav className="flex items-center h-13 md:gap-x-6">
                            <Link to="/">
                                <img className="w-18 h-16" src={logo} alt="logo"/>
                            </Link>

                            <ul className="hidden lg:flex items-center gap-x-4 lg:gap-x-6">
                                {renderCategoryDropdown()}
                                <li>
                                    <Link
                                        to="/courses"
                                        className={isActive('/courses') ? 'text-primary' : ''}
                                    >
                                        همه دوره‌ها
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/articles"
                                        className={isActive('/articles') ? 'text-primary' : ''}
                                    >
                                        مقالات
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Actions */}
                        <div className="flex gap-x-4 items-center">
                            {/* Search */}
                            <div className="py-2 hidden lg:flex">
                                <NavbarSearch/>
                            </div>

                            {/* Theme Toggle */}
                            <div className="py-2 hidden lg:flex">
                                <NavbarButton
                                    icon={theme === "light" ? BsMoon : BsSun}
                                    onClick={toggleTheme}
                                />
                            </div>

                            {/* Basket */}
                            <div className="relative py-2 flex">
                                <NavbarUserBasket/>
                            </div>

                            {/* User Info */}
                            <div className="relative py-2 hidden lg:flex">
                                <div className="relative py-2 hidden lg:flex">
                                    {isLoginIn ? (
                                        <NavbarUserProfile user={userInfos}/>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="flex gap-x-2 items-center py-3 px-5 rounded-lg bg-primary text-white"
                                        >
                                            <HiOutlineUser className="text-2xl"/>
                                            ورود | عضویت
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
