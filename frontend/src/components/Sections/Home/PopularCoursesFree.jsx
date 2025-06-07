import React, {useEffect, useState} from 'react';
import SectionHeader from "./SectionHeader.jsx";
import {API_PATHS} from "../../../utils/apiPaths.js";
import CourseCard from "../../Cards/CourseCard/CourseCard.jsx";
import Loader from "../../Loader.jsx";
import {useAxios} from "../../../hooks/useAxios.js";

function LastCourses() {
    const [allPopularFreeCourses, setAllPopularFreeCourses] = useState([]);
    const {request, loading, error} = useAxios();

    useEffect(() => {
        request({
            url: API_PATHS.COURSE.GET_ALL,
            method: "get",
        }).then((res) => {
            setAllPopularFreeCourses(res.data?.slice(0, 12));
        })
    }, [])

    return (
        <section className="section-wrapper">
            <div className="container">
                <SectionHeader
                    title="محبوب ترین دوره ها"
                    subtitle="پرمخاطب ترین دوره های رایگان سبزلرن"
                    link={{path: "/courses", title: "همه دوره ها"}}
                />

                {loading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                        {allPopularFreeCourses.map((course) => (
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
