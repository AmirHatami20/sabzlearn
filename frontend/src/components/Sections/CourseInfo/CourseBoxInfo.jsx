import React from "react";

function CourseBoxInfo({icon: Icon, title, subtitle, variant = "primary", star = false}) {
    return (
        <div
            className={`flex w-full flex-col md:flex-row text-center md:text-right items-center justify-center sm:justify-start gap-x-3.5 gap-y-2.5 pt-4 pb-4 sm:py-3.5 px-4.5 rounded-lg ${
                variant === "primary" ? "bg-white dark:bg-primary-dark" : "bg-gray-100 dark:bg-secendery-dark"
            }`}
        >
            <div className={`text-4xl ${star ? "text-amber-500" : "text-primary"}`}>
                <Icon/>
            </div>
            <div className="flex flex-col gap-y-2">
                <span className="font-dana-bold">{title}</span>
                <span className="text-sm">{subtitle}</span>
            </div>
        </div>
    )
}

export default CourseBoxInfo;