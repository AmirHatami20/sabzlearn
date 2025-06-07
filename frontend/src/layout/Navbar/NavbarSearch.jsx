import {useState} from 'react';
import NavbarButton from "./NavbarButton.jsx";
import {TfiSearch} from "react-icons/tfi";
import Overlay from "../../components/Overlay.jsx";
import {useNavigate} from "react-router-dom";

function NavbarSearch() {
    const navigate = useNavigate();
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleSubMenu = () => {
        setShowSubMenu(prev => !prev);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchValue.trim()) {
            navigate(`/courses?s=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <>
            {/* Lg size */}
            <div className="relative block xl:hidden z-20">
                {/* Search Icon Button */}
                <NavbarButton
                    icon={TfiSearch}
                    onClick={toggleSubMenu}
                    haveZIndex={showSubMenu}
                />

                {/* Dropdown Submenu */}
                <div
                    className={`absolute -left-24 top-full pt-4 z-20 transition-all ${
                        showSubMenu ? 'opacity-100 visible z-50' : 'opacity-0 invisible z-0'
                    }`}
                >
                    <form
                        onSubmit={handleSearch}
                        className="relative rounded-full py-3.5 px-5 bg-white  w-56 dark:bg-primary-dark"
                    >
                        <input
                            type="text"
                            placeholder="جستجو دوره..."
                            className="w-full text-sm rounded outline-none text-gray-900 dark:text-white"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className="absolute left-4 top-0 bottom-0 my-auto">
                            <TfiSearch className="text-xl"/>
                        </button>
                    </form>
                </div>

                {/* Overlay */}
                {showSubMenu && (
                    <Overlay
                        closeOverlay={toggleSubMenu}
                    />
                )}
            </div>

            {/* Xl size */}
            <form
                className="hidden xl:block"
                onSubmit={handleSearch}
            >
                <label className="relative h-13 block">
                    <input
                        className="bg-gray-100 text-slate-500 dark:bg-white/5 dark:text-white text-sm font-danaMedium rounded-full pr-4 pl-12 3xl:w-80 h-full"
                        type="text"
                        autoComplete="off"
                        placeholder="چیو میخوای یاد بگیری؟"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute left-4 top-0 bottom-0 w-6 h-6 my-auto text-slate-500 dark:text-white"
                    >
                        <TfiSearch className="text-xl"/>
                    </button>
                </label>
            </form>
        </>
    );
}

export default NavbarSearch;
