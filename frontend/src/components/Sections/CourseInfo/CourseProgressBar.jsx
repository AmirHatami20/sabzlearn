import React from "react";
import {toPersianNumber} from "../../../utils/helper.js";

function CourseProgressBar({ percent = 0 }) {
    const displayPercent = Math.min(Math.max(percent, 0), 100);

    return (
        <div className="mt-3.5 md:mt-4">
            <div className="flex items-center justify-between">
                <span>درصد پیشرفت دوره</span>
                <span className="font-dana-bold">{toPersianNumber(displayPercent)}%</span>
            </div>
            <div className="relative w-full bg-primary/20 rounded-full h-3 mt-3 md:mt-3.5">
                <div
                    className="absolute left-0 bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${displayPercent}%` }}
                />
            </div>
        </div>
    );
}

export default CourseProgressBar;
