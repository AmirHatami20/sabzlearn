import React from 'react';


function ContentHeader({title, color = "#000", icon: Icon, button, buttonText, buttonIcon: ButtonIcon, onClick}) {
    return (
        <div className="flex items-center justify-between gap-x-2 mb-5 sm:mb-7 relative">
            <div className="flex items-center gap-x-2">
                <span
                    className="absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-9.5 rounded-r-sm"
                    style={{background: color}}
                />
                <div className="text-4xl" style={{color}}>
                    <Icon/>
                </div>
                <span className="text-2xl font-dana-demiBold">{title}</span>
            </div>
            {button && (
                <button
                    onClick={onClick}
                    className="bg-primary text-white rounded-lg py-2 px-3 text-sm flex items-center gap-x-2"
                >
                    {buttonText}
                    <ButtonIcon className="text-xl"/>
                </button>
            )}
        </div>
    );
}

export default ContentHeader;
