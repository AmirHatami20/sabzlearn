import {useState} from 'react';

import {HiOutlineShoppingBag} from "react-icons/hi2";

import Overlay from "../../components/Overlay.jsx";
import NavbarButton from "./NavbarButton.jsx";

function NavbarUserBasket() {
    const [showUserBasket, setShowUserBasket] = useState(false);

    const toggleUserBasket = () => {
        setShowUserBasket(prev => !prev);
    }

    return (
        <>
            {/* Icon */}
            <NavbarButton
                icon={HiOutlineShoppingBag}
                onClick={toggleUserBasket}
                haveZIndex={showUserBasket}
            />

            {/* Sub-menu */}
            <div
                className={`absolute top-full shadow-md left-0 w-80 bg-white dark:bg-primary-dark text-slate-900 dark:text-white rounded-lg transition-all duration-200 ${
                    showUserBasket ? 'opacity-100 visible z-30' : 'opacity-0 invisible z-0'
                }`}
            >
                <div className="flex justify-between h-14 px-3 items-center dark:text-sky-100 dark:bg-primary bg-sky-100 rounded-t-lg">
                    <span className="font-bold text-sm">سبد خرید من</span>
                    <span className="text-xs">0 دوره</span>
                </div>
                <div className="flex items-center justify-center text-sm h-20">
                    سبد شما خالی است :(
                </div>
            </div>

            {/* Overlay */}
            {showUserBasket && (
                <Overlay
                    closeOverlay={toggleUserBasket}
                />
            )}
        </>
    );
}

export default NavbarUserBasket;