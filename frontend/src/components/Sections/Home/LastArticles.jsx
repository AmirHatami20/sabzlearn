import React, {useEffect, useState} from 'react';
import SectionHeader from "./SectionHeader.jsx";
import {API_PATHS} from "../../../utils/apiPaths.js";
import ArticleCard from "../../Cards/ArticleCard.jsx";
import Loader from "../../Loader.jsx";
import {useAxios} from "../../../hooks/useAxios.js";

function LastArticles() {
    const [allLastedArticles, setAllLastedArticles] = useState([]);
    const {request, loading, error} = useAxios();

    useEffect(() => {
        request({
            url: API_PATHS.ARTICLE.GET_ALL,
            method: "get",
        }).then((res) => {
            setAllLastedArticles(res.data?.slice(0, 4));
        })
    }, [])

    return (
        <section className="section-wrapper">
            <div className="container">
                <SectionHeader
                    title="آخرین مقالات ما"
                    subtitle="مقاله های بروز برنامه نویسی و تکنولوژی"
                    link={{path: "/articles", title: "همه مقالات"}}
                />

                {loading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                        {allLastedArticles.map((course) => (
                            <ArticleCard
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

export default LastArticles;