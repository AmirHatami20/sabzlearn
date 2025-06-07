import React from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {Link} from "react-router-dom";

function Breadcrumb({items}) {
    return (
        <div className="w-full flex items-center h-14 bg-white dark:bg-primary-dark rounded overflow-hidden">
            <div className="breadcrumb-item">
                <AiOutlineHome className="text-2xl"/>
            </div>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div
                        key={index}
                        className={`breadcrumb-item dark:text-white ${!isLast ? 'font-dana-light text-gray-700' : 'font-dana-medium text-gray-900'}`}
                    >
                        <Link to={item.href}>
                            {item.title}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Breadcrumb;
