import {useEffect, useMemo, useState, useCallback} from "react";
import {toPersianNumber} from "../utils/helper.js";

import {CiSearch} from "react-icons/ci";
import {RiArrowUpDownLine} from "react-icons/ri";
import {HiOutlineFunnel} from "react-icons/hi2";
import {LiaAngleDownSolid} from "react-icons/lia";
import {IoFolderOpenOutline} from "react-icons/io5";
import {FaAngleDown} from "react-icons/fa6";

import CourseCard from "../components/Cards/CourseCard/CourseCard.jsx";
import ArticleCard from "../components/Cards/ArticleCard.jsx";
import SortPanelMobile from "./MobilePanels/SortPanelMobile.jsx";
import ContentTypePanelMobile from "./MobilePanels/ContentTypePanelMobile.jsx";
import NoResults from "../components/NoResults.jsx";
import Loader from "../components/Loader.jsx";

function ContentLayout(
    {
        contentType,
        title,
        filters = [],
        items = [],
        categories = [],
        loading,
        error,
        isFetched,
        searchVal = ""
    }
) {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filterType, setFilterType] = useState(contentType === "course" || contentType === "category" ? "all" : "normal");
    const [visibleCount, setVisibleCount] = useState(6);
    const [showFreeOnly, setShowFreeOnly] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [showSortMobile, setShowSortMobile] = useState(false);
    const [showContentTypeMobile, setShowContentTypeMobile] = useState(false);

    const isCourse = contentType === "course" || contentType === "category";

    const itemLabel = isCourse ? "عنوان آموزشی" : "وبلاگ";
    const searchPlaceholder = ` جستجوی بین ${isCourse ? "دوره‌ها" : "مقاله‌ها"}`;

    // Sync with navbar search
    useEffect(() => {
        setSearchValue(searchVal);
    }, [searchVal]);

    // Debounce logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchValue]);

    // Reset visible items count when filters/search change
    useEffect(() => {
        setVisibleCount(6);
    }, [filterType, debouncedSearch]);

    // Reset filters when new search is made
    useEffect(() => {
        setSelectedCategories([]);
        setShowFreeOnly(false);
    }, [debouncedSearch]);

    const filteredItems = useMemo(() => {
        let result = [...items];

        // Search
        if (debouncedSearch.trim()) {
            const query = debouncedSearch.toLowerCase().trim();
            result = result.filter(item =>
                isCourse
                    ? item.name?.toLowerCase().includes(query)
                    : item.title?.toLowerCase().includes(query)
            );
        }

        // Free-only
        if (showFreeOnly) {
            result = result.filter(item => item.discount === 100);
        }

        // Filter by category
        if (selectedCategories.length) {
            result = result.filter(item => selectedCategories.includes(item.category?.title));
        }

        // Sort
        switch (filterType) {
            case "cheap":
                result.sort((a, b) => a.price - b.price);
                break;
            case "expensive":
                result.sort((a, b) => b.price - a.price);
                break;
            case "popular":
                result.sort((a, b) => b.registers - a.registers);
                break;
            default:
                break;
        }

        return result;
    }, [items, debouncedSearch, filterType, showFreeOnly, selectedCategories]);

    const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount]);

    const handleShowMore = useCallback(() => setVisibleCount(prev => prev + 6), []);
    const toggleFreeOnly = useCallback(() => setShowFreeOnly(prev => !prev), []);

    const toggleCategory = useCallback((title) => {
        setSelectedCategories(prev =>
            prev.includes(title) ? prev.filter(c => c !== title) : [...prev, title]
        );
    }, []);

    return (
        <div className="container mt-8 md:mt-10">
            {/* Title */}
            <div className="flex flex-col sm:flex-row gap-y-2 items-center justify-between mb-8 lg:mb-15">
                <div className="flex gap-2.5 items-center">
                    <span className="hidden sm:inline-block w-4 h-4 bg-amber-400 rounded-sm"/>
                    <h2 className="font-dana-bold text-2xl lg:text-2.5xl text-center">
                        {title}
                    </h2>
                </div>
                <span className="sm:text-xl font-danaMedium text-slate-500">
                    {toPersianNumber(items.length)} {itemLabel}
                </span>
            </div>

            {/* Grid */}
            <section className="grid grid-cols-12 gap-y-5 md:gap-x-7">
                {/* Sidebar */}
                <aside className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex h-16 gap-x-4 p-4 md:p-5 bg-white dark:bg-primary-dark rounded-lg"
                    >
                        <div
                            className="flex w-full items-center justify-between gap-x-6 h-full text-slate-500 dark:text-white">
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                className="flex-grow outline-none bg-transparent"
                            />
                            <button type="submit">
                                <CiSearch className="text-3xl"/>
                            </button>
                        </div>
                    </form>

                    {/* Free toggle */}
                    {isCourse && (
                        <div className="h-16 bg-white dark:bg-primary-dark rounded-lg p-5 hidden md:block">
                            <div className="flex justify-between items-center gap-x-4">
                                <span className="text-sm text-slate-600 dark:text-white">فقط دوره‌های رایگان</span>
                                <label className="relative inline-block w-11 h-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showFreeOnly}
                                        onChange={toggleFreeOnly}
                                        className="sr-only peer"
                                    />
                                    <div
                                        className="w-full h-full bg-gray-300 dark:bg-slate-600 rounded-full peer-checked:bg-primary transition-colors"/>
                                    <div
                                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:-translate-x-5"/>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Categories */}
                    {contentType === "course" && categories.length > 0 && (
                        <div className="bg-white dark:bg-primary-dark rounded-lg p-5 hidden md:block">
                            <div
                                className="flex items-center justify-between mb-5 pb-5 border-b border-b-neutral-200/60 dark:border-b-white/10">
                                <div className="flex gap-x-3 items-center">
                                    <IoFolderOpenOutline className="text-xl"/>
                                    دسته بندی دوره ها
                                </div>
                                <FaAngleDown className="text-xl"/>
                            </div>
                            <div className="flex flex-col">
                                {categories.map((item, index) => (
                                    <label key={index}
                                           className="flex gap-x-3 items-center py-2 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={selectedCategories.includes(item.title)}
                                            onChange={() => toggleCategory(item.title)}
                                        />
                                        <span
                                            className="w-4 h-4 cursor-pointer bg-gray-200 dark:bg-secendery-dark rounded peer-checked:bg-primary  transition-colors"
                                        />
                                        <span>{item.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main content */}
                <div className="col-span-full lg:col-span-8 xl:col-span-9 lg:sticky top-6 space-y-6">
                    {/* Mobile sort */}
                    <div className="flex md:hidden items-center gap-6 mb-8">
                        {isCourse && (
                            <button
                                className="flex justify-center gap-x-2 w-full py-3 rounded-lg items-center bg-white dark:bg-primary-dark"
                                onClick={() => setShowContentTypeMobile(true)}>
                                <HiOutlineFunnel className="text-xl"/>
                                فیلتر
                            </button>
                        )}
                        <button
                            className="flex justify-center gap-x-2 w-full py-3 rounded-lg items-center bg-white dark:bg-primary-dark"
                            onClick={() => setShowSortMobile(true)}>
                            <RiArrowUpDownLine className="text-xl"/>
                            {filters[0].title}
                        </button>
                    </div>

                    {/* Desktop sort */}
                    <div
                        className="hidden md:flex items-center gap-x-6 px-5 mb-8 h-15 bg-white dark:bg-primary-dark shadow-normal dark:shadow-none rounded-lg"
                    >
                        <div className="flex items-center shrink-0 gap-x-2">
                            <RiArrowUpDownLine className="text-2xl text-slate-700 dark:text-white"/>
                            <span>مرتب ‌سازی بر اساس:</span>
                        </div>
                        <div className="flex gap-x-5 lg:gap-x-8 h-full">
                            {filters.map((item, index) => (
                                <button
                                    key={index}
                                    className={`text-sm transition-colors ${
                                        item.value === filterType
                                            ? "border-b-2 border-primary text-primary font-semibold"
                                            : "text-slate-600 dark:text-white"
                                    }`}
                                    onClick={() => setFilterType(item.value)}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    {loading ? (
                        <Loader/>
                    ) : error ? (
                        <span className="text-sm mr-14 text-red-500">{error}</span>
                    ) : visibleItems.length === 0 && isFetched ? (
                        <NoResults
                            text={`متاسفانه ${isCourse ? "دوره‌ای" : "مقاله‌ای"} مطابق با جستجوی شما پیدا نشد ):`}
                        />
                    ) : (
                        <div className="grid grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {visibleItems.map((item, index) =>
                                isCourse
                                    ? <CourseCard key={index} {...item} />
                                    : <ArticleCard key={index} {...item} />
                            )}
                        </div>
                    )}

                    {/* Show more */}
                    {visibleCount < filteredItems.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleShowMore}
                                className="flex items-center gap-x-2 px-4 font-dana-light py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                            >
                                <span>نمایش بیشتر</span>
                                <LiaAngleDownSolid className="text-lg"/>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Modals */}
            <SortPanelMobile
                onClose={() => setShowSortMobile(false)}
                isShow={showSortMobile}
                filters={filters}
                filterType={filterType}
                setFilterType={setFilterType}
            />

            <ContentTypePanelMobile
                onClose={() => setShowContentTypeMobile(false)}
                isShow={showContentTypeMobile}
                showFreeOnly={showFreeOnly}
                setShowFreeOnly={setShowFreeOnly}
                categories={categories}
            />
        </div>
    );
}

export default ContentLayout;
