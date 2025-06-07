import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";

function ContentTypePanelMobile({ isShow, showFreeOnly, setShowFreeOnly, onClose ,categories}) {
    const handleReset = () => {
        setShowFreeOnly(false);
    };

    const handleSubmit = () => {
        onClose();
    };

    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-white dark:bg-primary-dark transition-all duration-300 ${
            isShow ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between bg-gray-100 dark:bg-secendery-dark items-center px-5">
                    <div className="flex items-center gap-x-2 h-16 shrink-0">
                        <button
                            onClick={onClose}
                            className="flex justify-center items-center border-2 rounded-full p-[2px]"
                        >
                            <RiCloseLine className="text-sm" />
                        </button>
                        <span className="text-lg font-dana-demiBold">فیلترها</span>
                    </div>
                    <div
                        className="flex items-center gap-x-2 text-red-600"
                        onClick={handleReset}
                    >
                        <span>حذف فیلتر ها</span>
                        <HiOutlineTrash className="text-2xl" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex-1 overflow-y-auto px-5">
                    <div className="flex justify-between items-center py-5">
                        <span className="text-md">فقط دوره‌های رایگان</span>
                        <label className="relative inline-block w-11 h-6 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showFreeOnly}
                                onChange={() => setShowFreeOnly(prev => !prev)}
                                className="sr-only peer"
                            />
                            <div
                                className="w-full h-full bg-gray-300 dark:bg-slate-600 rounded-full peer-checked:bg-primary transition-colors"
                            />
                            <div
                                className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:-translate-x-5"
                            />
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 bg-white dark:bg-primary-dark border-t border-gray-200">
                    <button
                        className="flex h-12 items-center justify-center w-full bg-primary py-3 rounded-lg text-white font-dana-light"
                        onClick={handleSubmit}
                    >
                        اعمال فیلتر
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContentTypePanelMobile;
