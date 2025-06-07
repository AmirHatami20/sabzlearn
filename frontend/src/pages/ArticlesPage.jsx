import React, {useEffect, useState} from 'react';
import ContentLayout from "../layout/ContentLayout.jsx";
import {useAxios} from "../hooks/useAxios.js";
import {API_PATHS} from "../utils/apiPaths.js";

function ArticlesPage() {
    const {request, loading, error} = useAxios();
    const [items, setItems] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        request({
            url: API_PATHS.ARTICLE.GET_ALL,
            method: "get",
        }).then((res) => {
            setItems(res.data);
            setIsFetched(true)
        })
    },[])

    return (
        <ContentLayout
            contentType="article"
            title="وبلاگ"
            filters={[
                {id: 1, title: "عادی", value: "normal"},
                {id: 2, title: "جدید ترین", value: "new"},
                {id: 3, title: "قدیمی ترین", value: "old"},
                {id: 4, title: "پر نظرها", value: "comment"},
            ]}
            items={items}
            loading={loading}
            error={error}
            isFetched={isFetched}
        />
    );
}

export default ArticlesPage;