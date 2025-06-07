import MainLayout from "../layout/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import CoursesPage from "../pages/CoursesPage.jsx";
import CourseInfoPage from "../pages/CourseInfoPage.jsx";
import ArticlesPage from "../pages/ArticlesPage.jsx";
import ArticleInfoPage from "../pages/ArticleInfoPage.jsx";
import SessionPage from "../pages/SessionPage.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";

import RegisterPage from "../pages/Auth/RegisterPage.jsx";
import LoginPage from "../pages/Auth/LoginPage.jsx";

import NotFoundPage from "../pages/NotFoundPage.jsx";

const appRoutes = [
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "courses", element: <CoursesPage/>},
            {path: "course/:courseName", element: <CourseInfoPage/>},
            {path: "course-cat/:categoryName", element: <CategoryPage/>},
            {path: "articles", element: <ArticlesPage/>},
            {path: "article-info/:articleName", element: <ArticleInfoPage/>},
            {path: ":courseName/:sessionID", element: <SessionPage/>},
        ]
    },
    {path: "/login", element: <LoginPage/>},
    {path: "/register", element: <RegisterPage/>},
    {path: "*", element: <NotFoundPage/>}
];

export default appRoutes;