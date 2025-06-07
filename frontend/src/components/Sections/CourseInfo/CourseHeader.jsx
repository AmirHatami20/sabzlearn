import React, {useEffect, useRef} from 'react';

import {HiOutlineAcademicCap} from "react-icons/hi2";
import {toPersianNumber} from "../../../utils/helper.js";
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import CountDownTimer from "../../CountDownTimer.jsx";

function VideoPlayer({src, poster}) {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = new Plyr(videoRef.current, {
            controls: [
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'settings',
                'fullscreen',
            ],
            autoplay: false,
        });

        return () => {
            player.destroy(); // جلوگیری از memory leak
        };
    }, []);

    return (
        <video
            ref={videoRef}
            className="w-full rounded-xl overflow-hidden"
            controls
            poster={poster}
        >
            <source src={src} type="video/mp4"/>
            مرورگر شما از ویدیو پشتیبانی نمی‌کند.
        </video>
    );
}

function CourseHeader({title, description, price, poster, discount, discountExp}) {
    return (
        <section
            className="grid grid-cols-1 lg:grid-cols-2 gap-y-4.5 gap-x-6 sm:gap-x-7 lg:items-center xl:items-stretch mt-8 sm:mt-10 rounded-xl p-4.5 lg:p-0 bg-white dark:bg-primary-dark lg:!bg-transparent">
            {/* Course Info */}
            <div className="flex flex-col justify-between order-2 lg:order-1">
                <div>
                    <h1 className="font-dana-demiBold text-[1.375rem]/8 sm:text-[1.625rem]/10 mb-4.5">
                        {title}
                    </h1>
                    <p className="font-dana-light sm:text-lg line-clamp-4 sm:line-clamp-3">
                        {description}
                    </p>
                </div>
                {/* Footer */}
                <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-4">
                    {/* Discount */}
                    {discount > 0 && (
                        <div
                            className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-y-4 gap-x-5 flex-wrap justify-between text-center sm:text-right p-4 xl:h-16 bg-gray-100 lg:bg-white dark:bg-gray-900 lg:dark:bg-primary-dark rounded-lg"
                        >
                            <div className="font-dana-demiBold sm:text-xl lg:text-center xl:text-right text-red-500">
                                {toPersianNumber(discount)}% پیشنهاد شگفت انگیز
                            </div>
                            <CountDownTimer
                                targetDate={discountExp}
                                variant="secondary"
                            />
                        </div>
                    )}
                    <div
                        className="flex justify-center xl:items-center lg:justify-between flex-wrap-reverse gap-y-4 gap-x-6"
                    >
                        <button
                            onClick={() => {
                            }}
                            className="flex items-center justify-center gap-x-3 py-3 px-4 bg-primary w-full md:w-max text-white rounded-lg"
                        >
                            <HiOutlineAcademicCap className="text-2xl"/>
                            افزودن به سبد خرید
                        </button>
                        <div className="flex items-end gap-x-2.5">
                            {discount > 0 ? (
                                <div className="flex items-end gap-x-2">
                                    <span className="text-slate-500 dark:text-white/70 text-xl line-through">
                                        {toPersianNumber(price)}
                                    </span>
                                    {discount === 100 ? (
                                        <span className="font-dana-bold text-2xl">رایگان!</span>
                                    ) : (
                                        <div className="flex items-center gap-x-1">
                                    <span className="font-dana-bold text-2xl">
                                        {toPersianNumber(price * discount / 100)}
                                    </span>
                                            <span className="text-lg">تومان</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-1">
                                    <span className="font-dana-bold text-2xl">
                                        {toPersianNumber(price)}
                                    </span>
                                    <span className="text-lg">تومان</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Banner */}
            <div className="order-1 w-full xl:h-[360px] rounded-xl overflow-hidden">
                <VideoPlayer
                    poster={poster}
                />
            </div>
        </section>
    );
}

export default CourseHeader;