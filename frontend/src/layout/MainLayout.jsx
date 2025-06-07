import React from 'react';
import Topbar from "./Topbar/Topbar.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import {Outlet} from "react-router-dom";

function MainLayout({children}) {
    return (
        <div className="bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-900">
            <Topbar/>
            <Navbar/>
            {children || <Outlet/>}
            <Footer/>
        </div>
    );
}

export default MainLayout;