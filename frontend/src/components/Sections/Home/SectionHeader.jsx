import React from 'react';
import {Link} from "react-router-dom";

import { GoArrowUpLeft } from "react-icons/go";

function SectionHeader({title, subtitle, link}) {
    return (
        <div className="flex sm:items-end justify-between flex-col sm:flex-row gap-x-4 gap-y-6 mb-9 sm:mb-13">
            <div className="flex flex-col items-start gap-y-2.5">
                <h3 className="section-title relative font-dana-medium text-base md:text-lg text-gray-700 dark:text-gray-400">
                    {title}
                </h3>
                <p className="font-dana-bold text-xl md:text-2xl">{subtitle}</p>
            </div>
            {link && (
                <Link
                    to={link.path}
                    className="flex gap-x-3 text-gray-700 dark:text-gray-400 font-dana-light"
                >
                    {link.title}
                    <GoArrowUpLeft/>
                </Link>
            )}
        </div>
    );
}

export default SectionHeader;