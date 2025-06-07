import Hero from "../components/Sections/Home/Hero/Hero.jsx";
import LastCourses from "../components/Sections/Home/LastCourses.jsx";
import RoadMaps from "../components/Sections/Home/RoadMaps/RoadMaps.jsx";
import PopularCourses from "../components/Sections/Home/PopularCourses.jsx";
import Services from "../components/Sections/Home/Sercives/Services.jsx";
import NewCourses from "../components/Sections/Home/NewCourses.jsx";
import LastArticles from "../components/Sections/Home/LastArticles.jsx";
import PopularCoursesFree from "../components/Sections/Home/PopularCoursesFree.jsx";
import HomeDescription from "../components/Sections/Home/HomeDescription/HomeDescription.jsx";

function HomePage() {
    return (
        <>
            <Hero/>
            <LastCourses/>
            <RoadMaps/>
            <PopularCourses/>
            <Services/>
            <NewCourses/>
            <LastArticles/>
            <PopularCoursesFree/>
            <HomeDescription/>
        </>
    );
}

export default HomePage;