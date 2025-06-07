const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");
const UserCourseModel = require("../models/user-course");
const BanPhoneModel = require("../models/ban-phone");
const OtpModel = require("../models/otp");
const transporter = require("../config/nodeMailer");


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
}

const sendOtp = async (email, res) => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await OtpModel.deleteMany({email}); // Delete pre

    await OtpModel.create({
        email,
        code,
        expiresAt: Date.now() + 2 * 60 * 1000
    });

    if (email) {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "کد تایید شما",
            html:`
                    <p>کد تایید شما: <strong>${code}</strong></p>
                    <p>این کد فقط ۲ دقیقه اعتبار دارد.</p>
                 `
        };

        await transporter.sendMail(mailOptions)
            .then(() => {
                console.log("OTP sent successfully");
            })
            .catch((err) => {
                console.error("Email sending error:", err);
            });
    }

    return res.status(200).json({
        success: true,
        message: "کد تایید ارسال شد."
    });
};

module.exports = {
    register: async (req, res) => {
        const {username, email, phone} = req.body;

        const isUserExists = await UserModel.findOne({
            $or: [
                {username},
                {email}
            ]
        });

        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: "نام کاربری یا ایمیل قبلا وارد شده است.",
            });
        }

        const isUserBan = await BanPhoneModel.findOne({phone});

        if (isUserBan) {
            return res.status(403).json({
                success: false,
                message: "این شماره در این سایت بن شده است."
            });
        }

        return sendOtp(email, res); // Send otp
    },
    login: async (req, res) => {
        const {email} = req.body;

        const user = await UserModel.findOne({email})

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "کاربری با این ایمیل یافت نشد."
            });
        }

        return sendOtp(email, res); // Send otp
    },
    verify: async (req, res) => {
        const {phone, code, mode, username, email, password} = req.body;

        const otp = await OtpModel.findOne({code,email});

        if (!otp || otp.code !== code) {
            return res.status(400).json({
                message: "کد تایید اشتباه است"
            });
        }

        if (otp.expiresAt < Date.now()) {
            return res.status(410).json({
                message: "کد تایید منقضی شده است"
            });
        }

        await OtpModel.deleteMany({email}); // Clean otp

        if (mode === "login") {
            const user = await UserModel.findOne({email})

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "کاربر یافت نشد."
                })
            }

            return res.json({
                user,
                token: generateToken(user._id),
                message: "ورود موفقیت‌آمیز بود"
            });
        }

        if (mode === "register") {
            const user = await UserModel.create({
                phone,
                username,
                email,
                password,
                role: "USER"
            });

            return res.status(201).json({
                user,
                token: generateToken(user._id),
                message: "ثبت ‌نام موفقیت‌آمیز بود"
            });
        }

    },
    getMe: async (req, res) => {
        const userId = req.user.id;

        const userCourses = await UserCourseModel.find({user: userId})
            .populate("course");

        const user = req.user;

        const courses = [];

        for (const userCourse of userCourses) {
            courses.push(userCourse.course);
        }

        return res.json({
            user,
            courses
        });
    }
}