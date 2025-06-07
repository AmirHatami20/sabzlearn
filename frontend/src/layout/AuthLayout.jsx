import React from 'react';
import logo from '../assets/images/logo_2.png';
import {Link} from "react-router-dom";

function AuthLayout({children}) {
    return (
        <div className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900">
            <main className="flex justify-center items-center flex-col relative px-4 py-6 min-h-screen z-40">
                <Link to="/">
                    <img
                        className="mb-10 h-20"
                        src={logo}
                        alt="logo"
                    />
                </Link>
                <div
                    className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white dark:bg-white/10 rounded-xl shadow-lg"
                >
                    {children}

                </div>
                <div className="max-w-[330px] w-full mx-auto text-center mt-7 sm:mt-8">
                    با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات
                    <Link to="/" className="text-primary font-dana-light"> سبزلرن </Link>
                    را پذیرفته اید.
                </div>

                <div
                    className="hidden lg:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"
                />
                <div
                    className="hidden lg:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"
                />
            </main>
        </div>
    );
}

export default AuthLayout;
