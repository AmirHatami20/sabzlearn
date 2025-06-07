import {Link} from "react-router-dom";
import {toPersianNumber} from "../../../../utils/helper.js";

function RoadMapBox({icon: Icon, title, count, href, firstColor, secondColor}) {
    return (
        <div
            className="py-5 rounded-xl overflow-hidden"
            style={{
                background: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
            }}
        >
            <Link
                to={`/category-info/${href}`}
                className="flex flex-col items-center justify-center text-white gap-y-2 font-dana-medium"
            >
                {Icon && <Icon className="w-10 h-10"/>}
                <span className="text-lg">{title}</span>
                <span className="text-base">{toPersianNumber(count)} دوره</span>
            </Link>
        </div>
    );
}

export default RoadMapBox;
