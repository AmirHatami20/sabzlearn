import {toPersianNumber} from "../../../utils/helper.js";

const getFinalPrice = (price, discount) => (
    Math.floor(price - (price * discount) / 100)
)

function CoursePrice({price, discount}) {
    const hasDiscount = discount > 0; // true or false
    const finalPrice = getFinalPrice(price, discount);
    const isFree = finalPrice === 0; // true or false

    return (
        hasDiscount ? (
            <div className="flex items-center gap-x-2.5">
                {/* Discount badge */}
                <div className="text-sm font-dana-medium p-1 rounded bg-primary text-white">
                    {toPersianNumber(discount)}٪
                </div>

                {/* Prices */}
                <div className="flex flex-col gap-y-1">
                <span className="text-sm text-slate-500 dark:text-white/70 line-through">
                    {`${toPersianNumber(price)} تومان`}
                </span>
                    <span className="text-base font-dana-bold text-primary">
                    {isFree ? "رایگان" : `${toPersianNumber(finalPrice)} تومان`}
                </span>
                </div>
            </div>
        ) : (
            <div className="text-base font-dana-bold text-primary">
                {`${toPersianNumber(finalPrice)} تومان`}
            </div>
        )
    )
}

export default CoursePrice;
