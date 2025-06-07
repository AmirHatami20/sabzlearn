import React from 'react';
import {Link} from "react-router-dom";

import logo_2 from "../../assets/images/logo_2.png";
import enamadIcon from "../../assets/images/enamad.png";

import {IoLogoInstagram} from "react-icons/io";
import {FaTelegramPlane} from "react-icons/fa";
import {FaLinkedin} from 'react-icons/fa';
import {PiPhoneLight} from "react-icons/pi";
import {CiMail} from "react-icons/ci";
import {PiTelegramLogoLight} from "react-icons/pi";

import {FOOTER_ACCESS, FOOTER_POPULAR_COURSE} from "../../utils/data.js";

function CircleIconLink({icon: Icon, href}) {
    return (
        <button className="p-2 bg-gray-300 text-white dark:text-gray-900 rounded-full flex items-center justify-center">
            <Link
                to={href}
            >
                <Icon className="text-2xl"/>
            </Link>
        </button>
    )
}

function SiteInfoLink({icon: Icon, title, href}) {
    return (
        <Link
            to={href}
            className="flex gap-x-2 items-center text-sm sm:text-[15px]"
        >
            <Icon className="text-2xl"/>
            <span>{title}</span>
        </Link>
    )
}

function Footer() {
    return (
        <footer
            className="mt-25 sm:mt-40 bg-white  text-gray-900 dark:bg-primary-dark dark:text-white py-8 md:pt-16 md:pb-10"
        >
            <div className="container mx-auto">
                {/* Footer Header */}
                <div
                    className="flex flex-wrap justify-between gap-y-5 items-start pb-5 mb-5 sm:pb-8 sm:mb-8 border-b border-b-neutral-200 dark:border-b-white/10">
                    <div className="flex flex-col">
                        <div>
                            <img
                                className="h-14 sm:h-16 lg:h-18"
                                src={logo_2}
                                alt="logo"
                            />
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-4 mt-5">
                            <SiteInfoLink
                                icon={PiPhoneLight}
                                title="09309242634"
                                href=""
                            />
                            <SiteInfoLink
                                icon={CiMail}
                                title="hatamiamir055@gmail.com"
                                href=""
                            />
                            <SiteInfoLink
                                icon={PiTelegramLogoLight}
                                title="amir_hatami0"
                                href=""
                            />
                        </div>
                    </div>
                    {/* Header left */}
                    <div className="flex gap-x-3">
                        <CircleIconLink
                            icon={FaLinkedin}
                            href=""
                        />
                        <CircleIconLink
                            icon={IoLogoInstagram}
                            href=""
                        />
                        <CircleIconLink
                            icon={FaTelegramPlane}
                            href=""
                        />
                    </div>
                </div>
                {/* Footer Body */}
                <div className="flex justify-center sm:justify-between items-start flex-wrap gap-5">
                    <div className="max-w-80">
                        <h6 className="footer-body-title">درباره سبزلرن</h6>
                        <p>
                            شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت و بدون استرس میتونی از
                            مسیر لذت ببری. ما در سبزلرن، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از
                            نتیجه زحمات مون لذت ببریم.
                        </p>
                    </div>
                    <div className="flex gap-x-6 sm:gap-x-7 items-start">
                        <div>
                            <h6 className="footer-body-title">دوره های پر طرفدار</h6>
                            <ul className="flex flex-col space-y-4">
                                {FOOTER_POPULAR_COURSE.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to={item.href}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h6 className="footer-body-title">دسترسی سریع</h6>
                            <ul className="flex flex-col space-y-4">
                                {FOOTER_ACCESS.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to={item.href}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <Link to="">
                            <img
                                className=""
                                src={enamadIcon}
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
                {/* Footer bottom */}
                <div
                    className="flex items-center justify-center text-center sm:text-right sm:justify-between flex-wrap gap-y-2 gap-x-4 mt-8 sm:mt-10 dark:text-neutral-300 font-dana-medium">
                    <p>کلیه حقوق مادی و معنوی سایت برای سبز لرن محفوظ است.</p>
                    <p>ساخته شده با ❤️ در سبزلرن</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;