import {toPersianNumber} from "../../../../utils/helper.js";

function HeroItemIcon({img, count, title}) {
    return (
        <div className="flex flex-col items-center text-white font-dana-bold space-y-2 w-20 sm:w-40">
            <img
                src={img}
                alt="icon"
                className="mb-4"
            />
            <span className="text-2xl sm:text-3xl">{toPersianNumber(count, false)}</span>
            <span className="text-xl">{title}</span>
        </div>
    );
}

export default HeroItemIcon;