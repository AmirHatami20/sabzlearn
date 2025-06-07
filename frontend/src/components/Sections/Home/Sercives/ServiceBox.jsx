import React from 'react';

function ServiceBox({icon: Icon, title, subtitle, color, bgColor, bgDark}) {
    return (
        <div className="flex flex-col lg:flex-row items-center p-5 lg:p-6 bg-white dark:bg-white/5 rounded-xl shadow shadow-primary">
            <div
                className={`flex justify-center lg:justify-end items-center w-[94px] h-13 lg:w-13 lg:h-[94px] mb-11 lg:mb-0 lg:ml-11 rounded-full ${color} ${bgColor} ${bgDark}`}
            >
                <Icon className="text-5xl  translate-y-1/2 lg:translate-y-0 lg:-translate-x-1/2  "/>
            </div>
            <div className="flex flex-col gap-y-2">
                <h3 className="lg:text-lg font-dana-bold">
                    {title}
                </h3>
                <p className="text-sm lg:text-base mt-3.5 lg:mt-2 text-gray-700 dark:text-gray-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default ServiceBox;