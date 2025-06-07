import React, {useEffect, useState} from "react";
import {API_PATHS} from "../../../utils/apiPaths.js";

import SectionHeader from "./SectionHeader.jsx";
import SwiperWrapper from "../../SwiperWrapper.jsx";
import Loader from "../../Loader.jsx";

import {useAxios} from "../../../hooks/useAxios.js";

function PopularCourses() {
    const [allPopularCourses, setAllPopularCourses] = useState([]);
    const {request, loading, error} = useAxios();

    useEffect(() => {
        request({
            url: API_PATHS.COURSE.GET_ALL,
            method: "get",
        }).then((res) => {
            setAllPopularCourses(res.data?.slice(0, 12));
        })
    }, [])


    return (
        <section className="section-wrapper">
            <div className="container relative">
                <SectionHeader
                    title="پرطرفدار ترین دوره ها"
                    subtitle="دوره های محبوب و پروژه محور سبزلرن"
                />

                {/* Swiper */}
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <SwiperWrapper
                        items={allPopularCourses}
                    />
                )}
            </div>
        </section>
    );
}

export default PopularCourses;
