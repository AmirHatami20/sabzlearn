import React from 'react';
import SectionHeader from "../SectionHeader.jsx";
import ServiceBox from "./ServiceBox.jsx";

import {
    HiOutlineBookOpen,
    HiOutlineChatBubbleLeftRight,
    HiOutlineChartBar,
    HiOutlineClipboardDocumentCheck
} from "react-icons/hi2";

function Services() {
    return (
        <section className="mt-24 md:mt-36">
            <div className="container">
                <SectionHeader
                    title="ما چه کمکی میتوانیم بهتون بکنیم"
                    subtitle="از شروع مسیر کنارتیم نمیذاریم آب تو دلت تکون بخوره"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    <ServiceBox
                        title="تضمین کاملترین محتوا"
                        subtitle="بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری."
                        icon={HiOutlineBookOpen}
                        color="text-sky-500"
                        bgColor="bg-sky-100"
                        bgDark="dark:bg-sky-500/20"
                    />
                    <ServiceBox
                        title="پشتیبانی دائمی"
                        subtitle="هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی."
                        icon={HiOutlineChatBubbleLeftRight}
                        color="text-amber-500"
                        bgColor="bg-amber-100"
                        bgDark="dark:bg-amber-500/20"
                    />
                    <ServiceBox
                        title="پروژه محور در راستای بازار کار"
                        subtitle="کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد."
                        icon={HiOutlineChartBar}
                        color="text-green-500"
                        bgColor="bg-green-100"
                        bgDark="dark:bg-green-500/20"
                    />
                    <ServiceBox
                        title="سراغ حرفه ای ها رفتیم"
                        subtitle="به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید."
                        icon={HiOutlineClipboardDocumentCheck}
                        color="text-red-500"
                        bgColor="bg-red-100"
                        bgDark="dark:bg-red-500/20"
                    />
                </div>
            </div>
        </section>
    );
}

export default Services;