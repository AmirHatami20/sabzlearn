import {LuBellRing} from "react-icons/lu";
import {FaArrowLeftLong} from "react-icons/fa6";
import {Link} from "react-router-dom";
import CountDownTimer from "../../components/CountDownTimer.jsx";

function Topbar() {
    const expiredDate = "2025-06-11T00:12:00"
    const isActive = new Date(expiredDate) - new Date()

    if (isActive > 0) {
        return (
            <div className="bg-primary">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between flex-wrap py-4 px-4 gap-y-5">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-x-3 text-white flex-wrap gap-y-3">
                        <LuBellRing className="hidden md:block text-2xl"/>
                        <span className="text-center leading-7">
                    فرصت رو از دست نده! فقط تا  فروردین دوره‌های یادی هاب نصف قیمت هستن!
                        </span>
                        <Link to="/courses">
                            <button className="text-primary bg-white rounded-lg p-2 flex items-center justify-center gap-x-2 font-medium text-[14px]">
                                <span>مشاهده دوره ها</span>
                                <FaArrowLeftLong/>
                            </button>
                        </Link>
                    </div>
                    <CountDownTimer
                        targetDate={expiredDate}
                        variant="primary"
                    />
                </div>
            </div>
        )
    }
}

export default Topbar;