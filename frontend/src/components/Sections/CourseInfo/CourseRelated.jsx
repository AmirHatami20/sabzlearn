import React, {useEffect, useState} from 'react';
import {useAxios} from "../../../hooks/useAxios.js";
import {API_PATHS} from "../../../utils/apiPaths.js";
import Loader from "../../Loader.jsx";
import {Link} from "react-router-dom";

import {FaArrowLeft} from "react-icons/fa";

function CourseRelated({courseId}) {
    const {request, loading} = useAxios()
    const [relatedCourses, setRelatedCourses] = useState(null);

    useEffect(() => {
        request({
            method: "GET",
            url: API_PATHS.COURSE.GET_RELATED(courseId),
        }).then((res) => {
            setRelatedCourses(res?.data.splice(0, 4));
        })
    }, [])

    if (loading) return <Loader/>;

    return (
        <div className="space-y-4 md:space-y-5">
            {relatedCourses?.map((course) => (
                <div
                    key={course._id}
                    className="flex items-center justify-between flex-wrap bg-gray-100 dark:bg-secendery-dark rounded-xl py-2 pr-2 pl-4"
                >
                    <div className="flex items-center gap-x-3">
                        <img
                            className="w-24 rounded-lg"
                            src={course.imageUrl}
                            alt="course-cover"
                        />
                        <Link
                            to={`/course/${course.shortName}`}
                        >
                            {course.name}
                        </Link>
                    </div>
                    <Link
                        to={`/course/${course.shortName}`}
                        className="flex gap-x-1.5 items-center justify-between sm:justify-normal text-sky-500 font-dana-demiBold text-sm"
                    >
                        <span> مشاهده</span>
                        <FaArrowLeft className="text-base rounded-full bg-sky-500 text-white p-[3px]"/>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default CourseRelated;