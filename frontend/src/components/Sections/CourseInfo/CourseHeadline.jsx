import React, {useEffect, useState} from 'react';
import {formatToMinuteSecond, toPersianNumber} from "../../../utils/helper.js";
import {useAxios} from "../../../hooks/useAxios.js";
import Loader from "../../Loader.jsx";
import {API_PATHS} from "../../../utils/apiPaths.js";

import {LiaAngleDownSolid} from "react-icons/lia";
import {HiOutlinePlayCircle} from "react-icons/hi2";
import {Link} from "react-router-dom";

function formatToHourMinute(seconds) {
    const hours = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);

    if (seconds === 0) return '0m';

    if (hours > 0) {
        return `${hours}h ${min}m`;
    } else {
        return `${min}m`;
    }
}

function CourseHeadline({courseId}) {
    const [showContentId, setShowContentId] = useState(null);
    const [courseSections, setCourseSections] = useState(null);
    const {request, loading} = useAxios();

    useEffect(() => {
        if (!courseId) return;

        request({
            method: 'GET',
            url: API_PATHS.SESSION.GET_COURSE_SESSION(courseId),
        }).then((res) => {
            setCourseSections(res.data);
        });
    }, [courseId]);

    const handleShowMore = (id) => {
        setShowContentId(prev => prev === id ? null : id);
    };

    if (loading) return <Loader/>;
    if (!courseSections?.length) return null;

    return (
        courseSections.map((section) => {
                const totalSectionDuration = section.sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

                return (
                    <div key={section._id}>
                        {/* Section Header */}
                        <div
                            className={`flex justify-between items-center p-4 rounded-t-lg cursor-pointer transition-all ${
                                showContentId === section._id
                                    ? "bg-gray-500 dark:bg-primary text-white"
                                    : "bg-gray-100 dark:bg-secendery-dark"
                            }`}
                            onClick={() => handleShowMore(section._id)}
                        >
                    <span className="font-dana-demiBold">
                        {toPersianNumber(section.title, false)}
                    </span>
                            <div className="flex items-center gap-x-2.5 shrink-0">
                                <div className={`hidden lg:flex items-center gap-x-1.5 text-sm transition-all duration-20 ${
                                    showContentId === section._id ? "text-white" : "text-slate-500 dark:text-white"
                                }`}>
                                    <span>{formatToHourMinute(totalSectionDuration)}</span>
                                    <span
                                        className="w-1 h-1 rounded-full bg-slate-400"
                                    />
                                    <span dir="ltr">{section?.sessions?.length || 0} lesson</span>
                                </div>
                                <LiaAngleDownSolid
                                    className={`text-xl transition-transform duration-200 ${
                                        showContentId === section._id ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Section Sessions */}
                        {showContentId === section._id && section.sessions.length > 0 && (
                            <div>
                                {section.sessions.map((session, index) => (
                                    <div
                                        key={session._id}
                                        className="flex items-center justify-between gap-x-5 gap-y-3 flex-wrap lg:flex-nowrap px-4 py-5 bg-gray-100 dark:bg-secendery-dark border-b border-gray-200 dark:border-gray-100/30 group"
                                    >
                                        <Link
                                            to="/"
                                            className="flex items-center gap-x-3"
                                        >
                                            <div
                                                className="bg-white dark:bg-white/10 w-7 h-7 rounded-md flex justify-center items-center text-sm group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                                                {toPersianNumber(index + 1)}
                                            </div>
                                            <span className="group-hover:text-primary">
                                        {toPersianNumber(session.title)}
                                    </span>
                                        </Link>

                                        <div
                                            className="flex items-center gap-x-2 group-hover:text-primary transition-colors duration-200">
                                    <span className="font-dana-light">
                                        {toPersianNumber(formatToMinuteSecond(session.duration))}
                                    </span>
                                            <HiOutlinePlayCircle className="text-3xl"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            }
        )
    );
}

export default CourseHeadline;
