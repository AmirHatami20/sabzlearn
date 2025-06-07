import React from 'react';
import {RiCloseLine} from 'react-icons/ri';
import {FaCheck} from "react-icons/fa6";
import Overlay from "../../components/Overlay.jsx";

function MobileSortPanel({isShow, onClose, filterType, setFilterType, filters}) {
    const handleSelect = (value) => {
        setFilterType(value);
        onClose();
    };

    return (
        <>
            <div className={`fixed right-0 left-0 z-50 transition-all ${
                isShow ? "bottom-0" : "-bottom-full"}`}
            >
                <div className="w-full bg-white dark:bg-primary-dark rounded-t-2xl">
                    {/* Header */}
                    <div
                        className="flex bg-gray-100 dark:bg-secendery-dark rounded-t-2xl py-2 px-5 justify-between items-center border-b border-gray-400">
                        <h2 className="text-lg font-dana-demiBold">
                            مرتب‌سازی بر اساس
                        </h2>
                        <button
                            onClick={onClose}
                            className="flex justify-center items-center border-2 rounded-full p-[2px]"
                        >
                            <RiCloseLine className="text-sm"/>
                        </button>
                    </div>
                    {/* Filters */}
                    <div className="px-5">
                        {filters.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`flex justify-between items-center w-full text-right p-2 rounded py-5 border-t border-gray-200 font-dana-light ${
                                    option.value === filterType ? "text-primary font-dana-medium" : ""
                                }`}
                            >
                                {option.title}
                                {option.value === filterType && (
                                    <div
                                        className="flex items-center justify-center p-[3px] rounded-full border-2 border-primary">
                                        <FaCheck className="text-[10px]"/>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {isShow && (
                <Overlay
                    closeOverlay={onClose}
                />
            )}
        </>
    );
}

export default MobileSortPanel;
