import React from 'react';
import {Link} from "react-router-dom";

import {CiUser} from "react-icons/ci";
import {FaStar} from "react-icons/fa6";
import {HiOutlineUsers} from "react-icons/hi2";

import {toPersianNumber} from "../../../utils/helper.js";

import CoursePrice from "./CoursePrice.jsx";

function CourseCard(props) {
    return (
        <div className="flex flex-col flex-1 bg-white dark:bg-white/5 rounded-xl shadow shadow-primary h-[417px] m-1">
            {/* Course banner */}
            <Link
                to={`/course/${props.shortName}`}
                className="h-42 bg-gray-100 dark:bg-secendery-dark"
            >
                <img
                    className="size-full object-cover rounded-xl"
                    src={props.imageUrl}
                    alt="course-cover"
                />
            </Link>
            {/* Course Name and Description */}
            <div className="flex-grow px-4.5 pt-4 pb-3">
                <h4 className="font-dana-demiBold line-clamp-2 mb-3">
                    <Link
                        to={`/course/${props.shortName}`}
                    >
                        {props.name}
                    </Link>
                </h4>

                <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-400 mb-2">
                    {props.description}
                </p>

            </div>
            {/* Course Footer */}
            <div className="px-4.5 pb-3">
                {/* Footer top */}
                <div
                    className="flex justify-between gap-2.5 text-slate-500 dark:text-white/70 text-sm pb-3 border-b border-b-neutral-200/70 dark:border-b-white/10">
                    <div className="flex gap-x-1 items-center">
                        <CiUser className="text-lg"/>
                        <span>{props.creator || "بدون سازنده"}</span>
                    </div>
                    <div className="flex items-start gap-x-1 text-amber-500">
                        <span className="text-base">۵.۰</span>
                        <FaStar className="text-lg"/>
                    </div>
                </div>
                {/* Footer bottom */}
                <div className="flex items-end justify-between mt-4">
                    <div className="flex gap-x-1 text-slate-500 dark:text-white/70">
                        <HiOutlineUsers className="text-lg"/>
                        <span className="text-sm">
                            {toPersianNumber(props.registers)}
                        </span>
                    </div>
                    {/* Course Price */}
                    <CoursePrice
                        price={props.price}
                        discount={props.discount}
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseCard;