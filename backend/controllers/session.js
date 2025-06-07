const SectionModel = require("../models/course-section");
const fs = require("fs");
const SessionModel = require("../models/course-session");
const CourseModel = require("../models/course");

module.exports = {
    createSection: async (req, res) => {
        const {title} = req.body;
        const courseId = req.params.id;

        if (!title || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Title and course ID are required"
            });
        }

        try {
            const section = await SectionModel.create({
                title,
                course: courseId
            });

            return res.status(201).json(section);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    createSession: async (req, res) => {
        const {title, free, sectionId, duration} = req.body;
        const courseId = req.params.id;

        if (!title || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'Title and sectionId are required',
            });
        }

        try {
            let videoUrl = null;

            if (req.file) {
                if (req.file.size > 200 * 1024 * 1024) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Failed to delete oversize file:', err);
                    });

                    return res.status(400).json({
                        success: false,
                        message: 'Video file is too large (max 200MB)',
                    });
                }

                videoUrl = `/uploads/${req.file.filename}`;
            }

            const session = await SessionModel.create({
                title,
                isFree: Boolean(free),
                course: courseId,
                section: sectionId,
                videoUrl,
                duration
            });

            return res.status(201).json({
                success: true,
                session
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || 'Something went wrong',
            });
        }
    },
    getSessions: async (req, res) => {
        const courseId = req.params.id

        try {
            const sections = await SectionModel.find({course: courseId})
                .select('title')
                .lean();

            // Add sessions to section
            const populatedSections = await Promise.all(sections.map(async (section) => {
                const sessions = await SessionModel.find({section: section._id})
                    .select('title videoUrl isFree duration')
                    .lean();

                return {...section, sessions};
            }));

            return res.status(200).json(populatedSections);

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || 'خطا در گرفتن سرفصل‌ها',
            });
        }

    },
    getSessionInfo: async (req, res) => {
        const {id, sessionID} = req.params;

        const course = await CourseModel.findById(id)
            .lean();

        const session = await SessionModel.findOne({course: course._id, _id: sessionID,});

        const sessions = await SessionModel.find({course: course._id});

        res.json({sessions, session});
    },
    deleteSession: async (req, res) => {
        const {id} = req.params;

        const deletedSession = await SessionModel.findByIdAndDelete(id);

        if (!deletedSession) {
            return res.status(404).json({
                success: false,
                message: "Session Not Found!"
            });
        }

        return res.json(deletedSession);
    },
}