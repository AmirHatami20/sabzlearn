export const toPersianNumber = (number, split = true) => {
    if (number == null) return "۰";

    if (split) {
        const withCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
        return withCommas.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    } else {
        return number.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    }
};

export const toEnglishDigits = (str = "") => {
    return str.toString().replace(/[۰-۹]/g, d => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);
};

export const toPersianDate = (date) => {

    function isLeapGregorian(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const g_y = date.getFullYear();
    const g_m = date.getMonth() + 1; // Month start from 0
    const g_d = date.getDate();

    const g_days_in_month = [31, 28 + (isLeapGregorian(g_y) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    let gy = g_y - 1600;
    let gm = g_m - 1;
    let gd = g_d - 1;

    let g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) g_day_no += g_days_in_month[i]; // Add Months
    g_day_no += gd; // Add days

    let j_day_no = g_day_no - 79;
    let j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;

    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
    j_day_no %= 1461;

    if (j_day_no >= 366) {
        jy += Math.floor((j_day_no - 1) / 365);
        j_day_no = (j_day_no - 1) % 365;
    }

    let jm, jd, i;
    for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
        j_day_no -= j_days_in_month[i];
    }
    jm = i + 1;
    jd = j_day_no + 1;

    return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
}

export const formatToMinuteSecond = (seconds) => {
    const min = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const paddedMin = String(min).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');

    return `${paddedMin}:${paddedSecs}`;
}



