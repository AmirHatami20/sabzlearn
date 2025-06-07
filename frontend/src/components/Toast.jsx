import {useEffect, useState} from "react";
import {FaCheck} from "react-icons/fa";
import {FiX} from "react-icons/fi";

const Toast = ({type, message = "", duration = 3000}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const toastStyles = {
        success: {
            icon: <FaCheck/>,
            color: "bg-green-600",
            title: "موفق",
            border: "border-green-500"
        },
        error: {
            icon: <FiX/>,
            color: "bg-red-600",
            title: "خطا",
            border: "border-red-600"
        }
    };

    const {icon, color, title, border} = toastStyles[type];


    return (
        <div
            className={`fixed top-8 left-6 z-50 flex items-center gap-x-5 px-6 py-4 border-b-3 text-gray-900 dark:text-white bg-white dark:bg-secendery-dark text-sm transition-opacity duration-300 ${border}`}
        >
            <div
                className={`w-10 h-10 text-xl flex items-center justify-center rounded-full text-white dark:text-gray-900 ${color}`}
            >
                {icon}
            </div>
            <div className="flex flex-col items-start gap-y-1">
                <span className="font-dana-bold text-lg">
                    {title}
                </span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Toast;
