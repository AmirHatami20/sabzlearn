import React from 'react';
import {Link} from "react-router-dom";
import {CiUser} from "react-icons/ci";
import {TiArrowLeft } from "react-icons/ti";

import {toPersianDate, toPersianNumber} from "../../utils/helper.js";


function ArticleCard(props) {
    let createdDate = new Date(props?.createdAt)
    let persianDate = toPersianDate(createdDate);

    return (
        <div className="flex flex-col flex-1 bg-white dark:bg-white/5 rounded-xl shadow shadow-primary h-[417px] m-1">
            {/* Article banner */}
            <Link
                to={`/courses/${props.shortName}`}
                className="h-44"
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
                        to={`/courses/${props.shortName}`}
                    >
                        {props.title}
                    </Link>
                </h4>

                <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-400 mb-2">
                    {props.description}
                </p>

            </div>
            {/* Course Footer */}
            <div className="px-4.5 pb-5">
                {/* Footer top */}
                <div
                    className="flex justify-between gap-2.5 text-slate-500 dark:text-white/70 text-sm pb-3 border-b border-b-neutral-200/70 dark:border-b-white/10"
                >
                    <div className="flex gap-x-1 items-center">
                        <CiUser className="text-lg"/>
                        <span>{props.creator?.name || "بدون نویسنده"}</span>
                    </div>

                    <span>{toPersianNumber(persianDate, false)}</span>

                </div>
                {/* Footer bottom */}
                <div className="flex mt-4 justify-center">
                    <Link
                        to={`/article/${props.shortName}`}
                        className="flex gap-x-1 text-sm font-dana-demiBold hover:text-primary"
                    >
                        مطالعه مقاله
                        <TiArrowLeft className="text-[8px] w-5 h-5 "/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;