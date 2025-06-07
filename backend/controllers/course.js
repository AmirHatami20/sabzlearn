const sanitizeHtml = require('sanitize-html');
const {UploadClient} = require("@uploadcare/upload-client");

const client = new UploadClient({publicKey: process.env.UPLOADCARE_PUBLIC_KEY});

const CourseModel = require("../models/course");
const UserCourseModel = require("../models/user-course");
const UserBasketModel = require("../models/user-basket");

module.exports = {
    createCourse: async (req, res) => {
        const {
            name,
            description,
            fullDescription,
            shortName,
            category,
            price,
            support,
            status,
            discount,
        } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).send({
                success: false,
                message: 'Please upload a file!',
            })
        }

        try {
            const result = await client.uploadFile(file.buffer, {
                fileName: file.originalname,
                contentType: file.mimetype,
            });

            const imageUrl = `https://ucarecdn.com/${result.uuid}/`;

            const safeFullDescription = sanitizeHtml(fullDescription, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h2", "h3", "img"]),
                allowedAttributes: {
                    ...sanitizeHtml.defaults.allowedAttributes,
                    img: ["src", "alt"],
                },
            });

            const course = await CourseModel.create({
                name,
                description,
                fullDescription: safeFullDescription,
                shortName,
                creator: req.user._id,
                category,
                price,
                isComplete: false,
                status,
                support,
                imageUrl,
                discount: discount ? discount : 0,
            });

            return res.status(201).json(course);

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
    },
    getAllCourse: async (req, res) => {
        const courses = await CourseModel.find()
            .populate("creator", "-password")
            .populate("category", "title name")
            .lean()
            .sort({_id: -1});

        const registers = await UserCourseModel.find()
            .lean();

        try {
            const registerMap = new Map();

            registers.forEach((reg) => {
                const key = reg.course.toString();
                if (!registerMap.has(key)) registerMap.set(key, []);
                registerMap.get(key).push(reg);
            });

            const allCourses = courses.map((course) => {
                const courseID = course._id.toString();
                const courseRegisters = registerMap.get(courseID) || [];

                return {
                    ...course,
                    creator: course.creator?.name,
                    registers: courseRegisters?.length,
                    courseAverageScore: 5
                };
            });

            return res.json(allCourses);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
    },
    getCourseInfo: async (req, res) => {
        const {shortName} = req.params;

        const course = await CourseModel.findOne({shortName})
            .populate("category", "title name")
            .populate("creator", "name phone email")
            .lean();

        const courseStudentsCount = await UserCourseModel.countDocuments({course: course._id});

        return res.json({
            ...course,
            courseStudentsCount,
        });
    },
    getRelated: async (req, res) => {
        const {id} = req.params;

        const course = await CourseModel.findById(id)
            .lean();

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const relatedCourses = await CourseModel.find({
            category: course.category,
            _id: {$ne: id} // All course without this course
        }).lean();

        res.json(relatedCourses);
    },
    registerCourse: async (req, res) => {
        const userId = req.user._id
        const courseId = req.params.id;

        const isUserAlreadyRegistered = await UserCourseModel.findOne({user: userId, course: courseId})
            .lean();

        if (isUserAlreadyRegistered) {
            return res.status(409).json({
                success: false,
                message: "you are already registered to this course."
            });
        }
        try {
            await UserCourseModel.create({
                user: userId,
                course: courseId,
            });

            return res.status(201).json({
                success: true,
                message: "you are registered successfully."
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            })
        }
    },
    addToBasket: async (req, res) => {
        const userId = req.user._id
        const courseId = req.params.id;

        try {
            const course = await CourseModel.findById(courseId)

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }

            let basket = await UserBasketModel.findOne({user: userId})

            if (!basket) {
                basket = await UserBasketModel.create({
                    user: userId,
                    items: []
                })
            }

            const isAlreadyInBasket = basket.items.some((item) => (
                courseId === item.course.toString()
            ))

            if (isAlreadyInBasket) {
                return res.status(409).json({
                    success: false,
                    message: "You are already added this course to basket."
                })
            }

            basket.items.push({course: courseId});
            await basket.save()

            return res.status(201).json(basket);

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            })
        }
    },
    deleteCourse: async (req, res) => {
        const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found!"
            });
        }

        return res.status(200).json(deletedCourse);
    },
    updateCourse: async (req, res) => {
        try {
            const {fullDescription} = req.body;
            const {id} = req.params;

            const safeFullDescription = sanitizeHtml(fullDescription, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h2", "h3", "img"]),
                allowedAttributes: {
                    ...sanitizeHtml.defaults.allowedAttributes,
                    img: ["src", "alt"],
                },
            });

            const updatedCourse = await CourseModel.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    fullDescription: safeFullDescription,
                },
                {new: true}
            );

            res.json({
                success: true,
                message: "دوره آپدیت شد",
                course: updatedCourse
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "خطای سرور"
            });
        }
    }
}
