import React, {useEffect, useMemo, useState} from 'react';
import {toPersianNumber} from "../utils/helper.js";

const variantProfiles = {
    primary: {
        days: "bg-white text-black",
        hours: "bg-white text-black",
        minutes: "border border-white text-white",
        seconds: "border border-white text-white",
    },
    secondary: {
        days: "text-red-500",
        hours: "border-l",
        minutes: "border-l",
        seconds: "border-l",
    },
}

const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) return null;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

const CountBox = ({label, value, keyName, variant}) => {
    const isPrimary = variant === 'primary';

    const base = useMemo(() =>
            isPrimary
                ? "w-12 h-12 rounded-full flex flex-col items-center justify-center gap-0.5 font-dana-light"
                : "flex flex-wrap items-center gap-x-1 font-dana-light pl-3 border-gray-300 text-xl"
        , [variant]);

    const style = variantProfiles[variant]?.[keyName] || "";

    return (
        <div className={`${base} ${style}`}>
            <span className="font-dana-bold">{toPersianNumber(value)}</span>
            <span className={isPrimary ? "text-xs" : "text-lg"}>{label}</span>
        </div>
    );
};


function CountDownTimer({targetDate, variant}) {

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const updated = calculateTimeLeft(targetDate);
            setTimeLeft(updated);
            if (!updated) clearInterval(timer);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    const {days, hours, minutes, seconds} = timeLeft;

    return (
        <div className={`flex items-center gap-x-3 justify-center`}>
            <CountBox keyName="seconds" label="ثانیه" value={seconds} variant={variant}/>
            <CountBox keyName="minutes" label="دقیقه" value={minutes} variant={variant}/>
            <CountBox keyName="hours" label="ساعت" value={hours} variant={variant}/>
            <CountBox keyName="days" label="روز" value={days} variant={variant}/>
        </div>
    );
}

export default CountDownTimer;
