import React, {useContext, useEffect, useState} from 'react';
import NavbarButton from "../Navbar/NavbarButton.jsx";
import {RxHamburgerMenu} from "react-icons/rx";
import noProfile from "../../assets/images/no-profile.jpg";
import {IoIosArrowBack, IoIosArrowDown} from "react-icons/io";
import Overlay from "../../components/Overlay.jsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

function MenuItem({title, name, icon: Icon, children, onClick, href}) {
    const {categoryName} = useParams();

    return (
        <li>
            <div className={`flex items-center justify-between py-1.5 text-sm font-light cursor-pointer ${
                categoryName && categoryName === name ? "text-primary" : ""
            }`}>
                <Link
                    to={href ? href : `course-cat/${name}`}
                >
                    {title}
                </Link>
                {Icon && (
                    <button onClick={onClick}>
                        <Icon className="text-sm"/>
                    </button>
                )}
            </div>
            {children}
        </li>
    )
}

function NavbarMobile({categories, toggleTheme, themeIcon: Icon}) {
    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false);
    const [showCategoryId, setShowCategoryId] = useState(null);

    const {isLoginIn} = useContext(AuthContext);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    }

    const toggleCategory = (id) => {
        setShowCategoryId(prev => (prev === id ? null : id));
    }

    const location = useLocation();

    // Close when switch page
    useEffect(() => {
        setShowSidebar(false);
        setShowCategoryId(null);
    }, [location.pathname]);

    return (
        <>
            {/* Icon */}
            <NavbarButton
                icon={RxHamburgerMenu}
                onClick={toggleSidebar}
            />

            {/* Side-menu */}
            <div
                className={`w-64 h-screen bg-white dark:bg-primary-dark overflow-y-auto pb-5 fixed top-0 bottom-0 transition-all ${
                    showSidebar ? "right-0 z-50" : "-right-64"
                }`}
            >
                {/* Side-menu header */}
                {isLoginIn ? (
                    <Link
                        to={"/"}
                        className="flex items-center justify-between py-3.5 px-4 bg-gray-100 dark:bg-white/5 mb-5"
                    >
                        <div className="flex gap-x-2.5 items-center">
                            <div className="">
                                <img
                                    className="w-13 h-13 rounded-full"
                                    src={noProfile}
                                    alt="noProfile"
                                />
                            </div>
                            <div className="flex flex-col gap-y-1.5 ">
                        <span className="text-sm font-bold">
                            امیر حاتمی
                        </span>
                                <span className=" text-xs font-light">
                            شنبه 30 فروردین 1404
                        </span>
                            </div>
                        </div>
                        <button className="">
                            <IoIosArrowBack/>
                        </button>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-x-2 py-4 bg-sky-500/10 text-primary font-danaDemiBold mb-5"
                    >
                        ورود یا ثبت نام
                    </Link>
                )}


                {/* Side-menu list */}
                <div className="px-6">
                    {isLoginIn && (
                        <ul className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                            <li>
                                <h6 className="text-sm text-primary font-semibold">دسترسی سریع</h6>
                            </li>
                            <MenuItem
                                title="دوره های من"
                                icon={IoIosArrowBack}
                                onClick={() => navigate("/")}
                            />
                            <MenuItem
                                title="تیکت های من"
                                icon={IoIosArrowBack}
                                onClick={() => navigate("/")}
                            />
                        </ul>
                    )}
                    <ul className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                        <li>
                            <h6 className="text-sm mb-2 text-primary font-semibold">دسته بندی ها</h6>
                        </li>
                        {categories.map((category) => (
                            <MenuItem
                                key={category._id}
                                title={category.title}
                                name={category.name}
                                onClick={() => toggleCategory(category._id)}
                                icon={showCategoryId === category._id ? IoIosArrowDown : IoIosArrowBack}
                            >
                                {/* Submenu */}
                                {category.courses.length > 0 && showCategoryId === category._id && (
                                    <ul className="bg-gray-100 dark:bg-white/5 p-2.5 space-y-1 rounded-lg mb-2">
                                        {category.courses.map((course) => (
                                            <li key={course._id}>
                                                <Link
                                                    to={`/courses/${course._id}`}
                                                    className="text-xs hover:text-primary py-1 font-light"
                                                >
                                                    {course.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </MenuItem>
                        ))}
                        <MenuItem
                            title="همه دوره ها"
                            href="/courses"
                        />
                        <MenuItem
                            title="مقالات"
                            href="/articles"
                        />
                    </ul>
                    <button
                        onClick={toggleTheme}
                        className="cursor-pointer flex gap-x-2"
                    >
                        <Icon/>
                        <span className="font-light text-sm">تم</span>
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {showSidebar && (
                <Overlay
                    closeOverlay={toggleSidebar}
                />
            )}
        </>
    );
}

export default NavbarMobile;