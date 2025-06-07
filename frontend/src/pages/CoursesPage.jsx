import {useEffect, useState} from 'react';
import ContentLayout from "../layout/ContentLayout.jsx";
import {useAxios} from "../hooks/useAxios.js";
import {API_PATHS} from "../utils/apiPaths.js";
import {useSearchParams} from "react-router-dom";

function CoursesPage() {
    const {request, loading, error} = useAxios();
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("s") || "";

    useEffect(() => {
        request({
            url: API_PATHS.COURSE.GET_ALL,
            method: "get",
        }).then((res) => {
            setItems(res.data);
            setIsFetched(true);
        })

        request({
            url: API_PATHS.CATEGORY.GET_ALL,
            method: "get",
        }).then((res) => {
            setCategories(res.data);
        })
    }, [])

    return (
        <ContentLayout
            contentType="course"
            title="دوره ها"
            filters={[
                {id: 1, title: "همه دوره ها", value: "all"},
                {id: 2, title: "ارزان ترین", value: "cheap"},
                {id: 3, title: "گران ترین", value: "expensive"},
                {id: 4, title: "پر مخاطب ترین", value: "popular"},
            ]}
            items={items}
            categories={categories}
            loading={loading}
            error={error}
            isFetched={isFetched}
            searchVal={searchQuery}
        />
    );
}

export default CoursesPage;