import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ContentLayout from "../layout/ContentLayout.jsx";
import {useAxios} from "../hooks/useAxios.js";
import {API_PATHS} from "../utils/apiPaths.js";

function CoursesPage() {
    const {request, loading, error} = useAxios();
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const {categoryName} = useParams();

    useEffect(() => {
        setItems([])
        setIsFetched(false);

        request({
            url: API_PATHS.COURSE.GET_ALL,
            method: "get"
        }).then((res) => {
            const allCourses = res.data;

            if (categoryName) {
                const filtered = allCourses.filter(course => course.category.name === categoryName);
                setItems(filtered);
            } else {
                setItems(allCourses);
            }
            setIsFetched(true);
        });

        request({
            url: API_PATHS.CATEGORY.GET_ALL,
            method: "get"
        }).then((res) => {
            setCategories(res.data);
        });
    }, [categoryName]);

    const selectedCategory = categories.find(c => c.name === categoryName);
    const displayTitle = selectedCategory?.title || "";

    return (
        <ContentLayout
            contentType="category"
            title={`دوره‌های ${displayTitle}`}
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
        />
    );
}

export default CoursesPage;
