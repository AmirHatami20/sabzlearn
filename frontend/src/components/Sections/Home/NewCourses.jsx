import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../utils/axiosInstance.js";
import {API_PATHS} from "../../../utils/apiPaths.js";
import SectionHeader from "./SectionHeader.jsx";
import SwiperWrapper from "../../SwiperWrapper.jsx";
import Loader from "../../Loader.jsx";
import CourseCard from "../../Cards/CourseCard/CourseCard.jsx";
import {useAxios} from "../../../hooks/useAxios.js";

function NewCourses() {
    const [allNewCourses, setAllNewCourses] = useState([]);
    const {request, loading, error} = useAxios();

    useEffect(() => {
        request({
            url: API_PATHS.COURSE.GET_ALL,
            method: "get",
        }).then((res) => {
            setAllNewCourses(res.data?.slice(0, 12));
        })
    }, [])

    return (
        <section className="section-wrapper">
            <div className="container relative">
                <SectionHeader
                    title="جدید ترین ها"
                    subtitle="دوره های جدید، فرصت های نو"
                />

                {/* Swiper */}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <SwiperWrapper
                        items={allNewCourses}
                    />
                )}
            </div>
        </section>
    );
}

export default NewCourses;