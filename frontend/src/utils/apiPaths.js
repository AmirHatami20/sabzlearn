export const BASE_URL = "https://sabzlearn-yrz3.onrender.com";

// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/Auth/register",
        LOGIN: "/Auth/login",
        VERIFY: "/Auth/verify",
        GET_USER_INFO: "/Auth/me",
    },
    ARTICLE: {
        CREATE: "/article",
        GET_ALL: "/article",
        GET_BY_ID: (articleId) => `/articles/${articleId}`,
        DELETE: (articleId) => `/articles/${articleId}`,
    },
    CATEGORY: {
        CREATE: "/category",
        GET_ALL: "/category",
        UPDATE: (categoryId) => `/category/${categoryId}`,
        DELETE: (categoryId) => `/category/${categoryId}`,
    },
    SESSION: {
        CREATE_COURSE_SECTION: (courseId) => `/session/${courseId}/section`,
        CREATE_COURSE_SESSION: (courseId) => `/session/${courseId}/sessions`,
        GET_COURSE_SESSION: (courseId) => `/session/${courseId}/sessions`,
        GET_ONE_SESSION: (courseId, sessionId) => `/session/${courseId}/${sessionId}`,
        DELETE_SESSION: (sessionId) => `/session/${sessionId}`,
    },
    COMMENT: {
        CREATE: (courseId) => `/comment/${courseId}`,
        GET_ALL: (courseId) => `/comment/${courseId}`,
        ANSWER_TO_COMMENT: (commentId) => `/comment/answer/${commentId}`,
        ACCEPT: (commentId) => `/comment/accept/${commentId}`,
        REJECT: (commentId) => `/comment/reject/${commentId}`,
        DELETE: (commentId) => `/comment/${commentId}`,
    },
    COURSE: {
        CREATE: "/course",
        GET_ALL: "/course",
        GET_BY_NAME: (courseName) => `/course/${courseName}`,
        GET_RELATED: (courseId) => `/course/related/${courseId}`,
        REGISTER_TO_COURSE: (courseId) => `/course/${courseId}/register`,
        ADD_TO_BASKET: (courseId) => `/course/${courseId}/addToBasket`,
        DELETE: (courseId) => `/course/${courseId}`,
        DELETE_SESSION: (sessionId) => `/course/sessions/${sessionId}`,
    },
    SEARCH: {
        SEARCH_RESULT: (searchValue) => `/search/${searchValue}`
    },
    OFF: {
        CREATE: "/off",
        GET_ALL: "/off",
        GET_BY_ID: (offId) => `/off/${offId}`,
        DELETE: (offId) => `/off/${offId}`,
        USE_FOR_ONE: (courseId) => `/off/use/${courseId}`,
        USE_FOR_ALL: '/off/use/all'
    },
    USER: {
        GET_ALL: "/user",
        DELETE: (userId) => `/user/${userId}`,
        BAN: (userId) => `/user/ban/${userId}`,
        UNBAN: (userId) => `/user/unban/${userId}`,
        USER_COURSE: "/user/courses",
        USER_BASKET: "/user/basket",
        CHANGE_ROLE: (userId) => `/user/role/${userId}`,
    },
    IMAGES: {
        UPLOAD_IMAGES: "/Auth/upload-image"
    }
}
