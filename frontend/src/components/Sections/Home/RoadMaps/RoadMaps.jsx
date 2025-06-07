import React from 'react';
import SectionHeader from "../SectionHeader.jsx";
import RoadMapBox from "./RoadMapBox.jsx";

import {FaLaptopCode} from "react-icons/fa6";
import {GoShieldCheck} from "react-icons/go";
import {AiOutlinePython} from "react-icons/ai";
import {LuPuzzle} from "react-icons/lu";

import {toPersianNumber} from "../../../../utils/helper.js";

const roadmaps = [
    {
        title: "فرانت اند",
        icon: FaLaptopCode,
        count: 20,
        firstColor: "#FFB535",
        secondColor: "#F2295B",
    },
    {
        title: "امنیت",
        icon: GoShieldCheck,
        count: 9,
        firstColor: "#30C5E4",
        secondColor: "#28E55D",
    },
    {
        title: "پایتون",
        icon: AiOutlinePython,
        count: 7,
        firstColor: "#2E9EFF",
        secondColor: "#9C33F7",
    },
    {
        title: "مهارت های نرم",
        icon: LuPuzzle,
        count: 6,
        firstColor: "#FF3571",
        secondColor: "#880175",
    },
];

function RoadMaps() {
    return (
        <section className="mt-24 md:mt-36">
            <div className="container">
                <SectionHeader
                    title="نقشه راه ها"
                    subtitle="نقشه راه ها برای شروع اصولی یادگیری"
                />
                {/* Roads */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
                    {roadmaps.map(({title, icon, count, firstColor, secondColor}, index) => (
                        <RoadMapBox
                            key={index}
                            title={title}
                            icon={icon}
                            count={toPersianNumber(count)}
                            firstColor={firstColor}
                            secondColor={secondColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RoadMaps;
