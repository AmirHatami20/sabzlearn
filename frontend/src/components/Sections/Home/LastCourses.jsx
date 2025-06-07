import React, {useEffect, useState} from 'react';
import SectionHeader from "./SectionHeader.jsx";
import {API_PATHS} from "../../../utils/apiPaths.js";
import CourseCard from "../../Cards/CourseCard/CourseCard.jsx";
import Loader from "../../Loader.jsx";
import {useAxios} from "../../../hooks/useAxios.js";

// function shuffleArray(array) {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
// }

function LastCourses() {
    const [allLastedCourses, setAllLastedCourses] = useState([]);
    const {request, loading, error} = useAxios();

    useEffect(() => {
        request({
            url: API_PATHS.COURSE.GET_ALL,
            method: "get",
        }).then((res) => {
            setAllLastedCourses(res.data?.slice(0, 12));
            // setAllLastedCourses(shuffleArray(res.data));
        })
    }, [])

    return (
        <section>
            <div className="container">
                <SectionHeader
                    title="آخرین دوره های ما"
                    subtitle="سکوی پرتاب شما به سمت موفقیت"
                    link={{path: "/courses", title: "همه دوره ها"}}
                />

                {loading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                        {allLastedCourses.map((course) => (
                            <CourseCard
                                key={course._id}
                                {...course}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default LastCourses;
