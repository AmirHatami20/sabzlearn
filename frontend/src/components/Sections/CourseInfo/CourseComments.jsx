import React, {useContext, useEffect, useState} from 'react';
import {useAxios} from "../../../hooks/useAxios.js";
import {API_PATHS} from "../../../utils/apiPaths.js";
import Loader from "../../Loader.jsx";

import noProfile from "../../../assets/images/no-profile.jpg"
import {HiMiniArrowUturnLeft} from "react-icons/hi2";

import {toPersianDate, toPersianNumber} from "../../../utils/helper.js";

function CourseComments({courseId}) {
    const {request, loading} = useAxios()
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        request({
            method: "GET",
            url: API_PATHS.COMMENT.GET_ALL(courseId),
        }).then((res) => {
            setAllComments(res.data);
        })
    }, [])

    if (loading) return <Loader/>;

    if (allComments.length === 0) return (
        <span className="text-red-500 font-dana-demiBold text-xl"> هیج نظری وجود ندارد...</span>
    )

    return (
        <div className="space-y-4">
            {allComments.map((comment) => {
                    const date = new Date(comment?.createdAt)

                    return (
                        <div
                            key={comment._id}
                            className="p-4.5 md:p-5 bg-gray-100 dark:bg-secendery-dark rounded-lg"
                        >
                            <div
                                className="flex items-center justify-between pb-4 mb-4 border-b border-b-neutral-200/60 dark:border-white/10"
                            >
                                <div className="flex items-center gap-x-3.5">
                                    <div
                                        className="hidden sm:flex items-center justify-center border-neutral-200 dark:border-white/10 w-15 h-15 border rounded-full relative"
                                    >
                                        <img
                                            src={noProfile}
                                            alt="noProfile"
                                            className="w-12 h-12 block object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-1 ">
                                            <span>{toPersianNumber(comment.creator.username) || "نامشخص"}</span>
                                            <span
                                                className="font-dana-demiBold">| {comment.creator.role === "ADMIN" ? "مدرس" : "کاربر"}</span>
                                        </div>
                                        <span className="text-sm font-dana-light">
                                            {toPersianNumber(toPersianDate(date), false)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                    }}
                                    className="flex items-center justify-center w-10 h-10 border border-primary text-primary rounded-full hover:bg-primary/10"
                                >
                                    <HiMiniArrowUturnLeft className="text-xl"/>
                                </button>
                            </div>
                            <p className="font-dana-Light text-sm sm:text-base">
                                {comment.body}
                            </p>

                            {comment.parentComment === null &&
                                Object.values(comment?.answerContent || {}).map((answer) => {
                                    const date = new Date(answer?.createdAt);

                                    return (
                                        <div
                                            key={answer._id}
                                            className="mt-4 p-4.5 md:p-5 bg-gray-200 dark:bg-white/10 rounded-lg"
                                        >
                                            {/* Header: Avatar + User Info */}
                                            <div
                                                className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-white/10">
                                                <div className="flex items-center gap-x-3.5">
                                                    <div
                                                        className={`hidden sm:flex items-center justify-center w-15 h-15 border rounded-full relative ${
                                                            answer?.creator.role === "ADMIN" ? "border-primary" : "border-slate-300 dark:border-white/10"
                                                        }`}
                                                    >
                                                        <img
                                                            src={noProfile}
                                                            alt="noProfile"
                                                            className="w-12 h-12 block object-cover rounded-full"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-y-2">
                                                        <div className="flex items-center gap-x-1">
                                                            <span>{toPersianNumber(answer?.creator?.username || "نامشخص")}</span>
                                                            <span className="font-dana-demiBold">
                                                            | {answer?.creator?.role === "ADMIN" ? "مدرس" : "کاربر"}
                                                        </span>
                                                        </div>
                                                        <span className="text-xs text-gray-500 dark:text-white/70">
                                                         {toPersianNumber(toPersianDate(date), false)}
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <p className="font-dana-Light text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-white">
                                                {answer.body}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default CourseComments;