const OffModel = require("../models/off");
const CourseModel = require("../models/course");

module.exports = {
    createOff: async function (req, res) {
        const {code, percent, course, max} = req.body;

        try {
            const off = await OffModel.create({
                code,
                percent,
                course,
                max,
                creator: req.user._id,
            });

            return res.status(201).json(off);

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },
    getAllOff: async function (req, res) {
        try {
            const offs = await OffModel.find()
                .populate("course", "name")
                .populate("creator", "name")

            return res.status(200).json(offs);

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    getOneOff: async function (req, res) {
        const {id} = req.params;

        try {
            const off = await OffModel.findById(id)
                .populate("course", "name");

            if (!off) {
                return res.status(404).json({
                        success: false,
                        message: "Not found"
                    }
                );
            }

            return res.status(200).json(off);

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    deleteOff: async function (req, res) {
        const {id} = req.params;

        try {
            const deletedOff = await OffModel.findByIdAndDelete(id);

            if (!deletedOff) {
                return res.status(404).json({
                    success: false,
                    message: "Off Code Not Found!"
                });
            }

            return res.json(deletedOff);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    useOffCode: async function (req, res) {
        const {code} = req.body;
        const {courseId} = req.params;
        const userId = req.user._id;

        try {
            const off = await OffModel.findOne({code});

            if (!off) {
                return res.status(404).json({
                    success: false,
                    message: "Discount code not found"
                });
            }

            if (off.course.toString() !== courseId) {
                return res.status(400).json({
                    success: false,
                    message: "This code is not valid for this course"
                });
            }

            if (off.uses >= off.max) {
                await OffModel.findByIdAndDelete(off._id);
                return res.status(400).json({
                    success: false,
                    message: "This discount code has expired"
                });
            }

            if (!off.isPublic && !off.allowedUsers.includes(userId)) {
                return res.status(403).json({
                    success: false,
                    message: "You dont have permission to use this course"
                });
            }

            if (off.usedBy.includes(userId)) {
                return res.status(400).json({
                    success: false,
                    message: "You already use this code"
                });
            }

            off.uses += 1;
            off.usedBy.push(userId);

            if (off.uses >= off.max) {
                await off.save();
                await OffModel.findByIdAndDelete(off._id);
            } else {
                await off.save();
            }

            return res.status(200).json({
                discountPercent: off.percent
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    setOnAll: async function (req, res) {
        const {discount} = req.body;

        await CourseModel.updateMany({}, {$set: {discount}});

        return res.json({
            success: true,
            msg: "Discounts set successfully"
        });
    }
}