const UserModel = require("../models/user");
const BanUserModel = require("../models/ban-phone");
const UserCourseModel = require("../models/user-course");
const UserBasketModel = require("../models/user-basket");

module.exports = {
    getAllUsers: async function (req, res) {
        try {
            const users = await UserModel.find();

            return res.json(users);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message,
            })
        }
    },
    deleteUser: async function (req, res) {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "There is not user"
            });
        }

        return res.send(deletedUser);
    },
    banUser: async function (req, res) {
        const mainUser = await UserModel.findById(req.params.id)
            .lean();

        const banUserResult = await BanUserModel.create({phone: mainUser.phone});

        if (!banUserResult) {
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User ban successfully"
        });
    },
    unbanUser: async function (req, res) {
        const mainUser = await UserModel.findById(req.params.id)
            .lean();

        const banUserResult = await BanUserModel.deleteOne({phone: mainUser.phone});

        if (!banUserResult) {
            return res.status(500).json({
                success: false,
                message: "Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User unban successfully"
        });
    },
    getUserCourses: async function (req, res) {
        const userId = req.user._id;

        const userCourses = await UserCourseModel.find({user: userId})
            .populate("course")
            .lean();

        res.json(userCourses);
    },
    getUserBasket: async function (req, res) {
        const userId = req.user._id;

        const userCourses = await UserBasketModel.find({user: userId})
            .populate("items.course")
            .lean();

        res.json(userCourses);
    },
    updateUser: async function (req, res) {
        const {name, username, email, password, phone} = req.body;
        const userId = req.user._id;

        try {
            const data = {
                name,
                username,
                email,
                password,
                phone,
            }

            const user = await UserModel.findByIdAndUpdate(userId, data, {new: true});

            return res.status(201).json(user);

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    changeUserRole: async function (req, res) {
        const {id} = req.params;

        await UserModel.findByIdAndUpdate(id, {role: "ADMIN"});

        return res.json({
            success: true,
            msg: 'User role changed successfully'
        });
    }
}