import {useCallback, useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from 'swiper/modules';

import {TfiAngleLeft, TfiAngleRight} from "react-icons/tfi";
import CourseCard from "./Cards/CourseCard/CourseCard.jsx";

function SwiperWrapper({items}) {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className="swiper-container">
            <Swiper
                ref={sliderRef}
                loop={items.length > 4}
                spaceBetween={24}
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    }
                }}
            >
                {items?.map((item) => (
                    <SwiperSlide
                        key={item._id}
                    >
                        <CourseCard
                            {...item}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-center mt-4 md:mt-0 md:justify-start md:absolute top-0 left-6  gap-x-3">
                <button
                    onClick={handlePrev}
                    className="swiper-button"
                >
                    <TfiAngleRight/>
                </button>
                <button
                    onClick={handleNext}
                    className="swiper-button"
                >
                    <TfiAngleLeft/>
                </button>
            </div>
        </div>
    );
}

export default SwiperWrapper;