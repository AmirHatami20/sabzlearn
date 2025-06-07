import {useState} from 'react';
import bgImage from '../../../../assets/images/hero-bg.jpg';

import clockImage from '../../../../assets/images/clock-min.webp';
import bookImage from '../../../../assets/images/book-min.webp';
import conversationImage from '../../../../assets/images/conversation-min.webp';

import {FaChevronDown} from "react-icons/fa6";
import {CiSearch} from "react-icons/ci";

import HeroItemIcon from "./HeroItemIcon.jsx";
import {useNavigate} from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');


    const handleSearch = (e) => {
        e.preventDefault();

        if (searchValue.trim()) {
            navigate(`/courses?s=${encodeURIComponent(searchValue)}`);
            setSearchValue('');
        }

    };
    return (
        <section
            className="relative h-[450px] sm:h-[550px] lg:h-[650px] bg-cover bg-center bg-no-repeat pb-7 sm:pb-0 mb-9 sm:mb-10 lg:mb-20"
            style={{backgroundImage: `url(${bgImage})`}}
        >
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/50"
            />

            {/* bottom-icon */}
            <div className="">
                <svg
                    className="hidden lg:block absolute bottom-0 inset-x-0 mx-auto text-gray-100 dark:text-gray-900 pointer-events-none w-[100px] h-[22px]"
                    viewBox="0 0 100 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z" fill="currentColor"/>
                </svg>

                <FaChevronDown
                    className="hidden lg:block absolute -bottom-1 inset-x-0 mx-auto size-5 text-gray-900 dark:text-white pointer-events-none"
                />
            </div>

            {/* hero content */}
            <div
                className="relative z-10 flex flex-col items-center pt-15 md:pt-12 h-full text-white px-4 text-center"
            >
                <h1 className="font-dana-bold text-lg sm:text-[2.25rem]/[52px] ">
                    سبزلرن، اولین گام برنامه‌نویس شدن
                </h1>
                <p className="font-dana-bold text-xs sm:text-lg mt-3 sm:mt-8 px-8 sm:px-0">
                    با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن
                </p>
                <div
                    className="relative w-full md:w-3/7 mx-auto space-y-6 mt-7 sm:mt-12 lg:mt-14 mb-10 lg:mb-14 my-14 z-30"
                >
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center justify-between gap-x-5 md:gap-x-8 p-1.5 sm:p-2.5 bg-white rounded-full border border-transparent focus-within:border-neutral-200 transition-all"
                    >
                        <input
                            autoComplete="off"
                            type="text"
                            className="flex-grow pr-2.5 bg-transparent text-gray-900 font-danaMedium text-sm md:text-base outline-none"
                            placeholder="جستجو در بین دوره ها ..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center shrink-0 text-lg p-2 md:text-2xl text-white rounded-full bg-primary"
                        >
                            <CiSearch/>
                        </button>
                    </form>
                </div>
                <div className="flex justify-center gap-x-8 sm:gap-x-16 lg:gap-x-20 3xl:mt-20 font-dana-bold">
                    <HeroItemIcon
                        img={clockImage}
                        count="1300"
                        title="ساعت آموزش"
                    />
                    <HeroItemIcon
                        img={bookImage}
                        count="73"
                        title="دوره آموزشی"
                    />
                    <HeroItemIcon
                        img={conversationImage}
                        count="120502"
                        title="دانشجو"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;