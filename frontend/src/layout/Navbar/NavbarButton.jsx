import React from 'react';

function NavbarButton({icon: Icon, onClick,haveZIndex}) {
    return (
        <div
            onClick={onClick}
            className={`relative flex text-xl size-13 items-center justify-center bg-gray-100 dark:bg-white/5 dark:text-white text-slate-500 cursor-pointer rounded-full ${
                haveZIndex ? 'z-30' : 'z-0'
            }`}
        >
            <Icon/>
            
        </div>
    );
}

export default NavbarButton;