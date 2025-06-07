const CommentModel = require("../models/comment");
const CourseModel = require("../models/course");

module.exports = {
    getAllComment: async (req, res) => {
        const courseId = req.params.id;

        const allComments = await CommentModel.find({course: courseId})
            .populate("creator", "username role")
            .lean();

        const answersMap = new Map();
        const rootComments = [];

        for (const comment of allComments) {
            if (comment.parentComment !== null) {
                const parentId = String(comment.parentComment);
                if (!answersMap.has(parentId)) {
                    answersMap.set(parentId, []);
                }
                answersMap.get(parentId).push(comment);
            } else {
                rootComments.push(comment);
            }
        }

        const commentsWithAnswers = rootComments.map(comment => ({
            ...comment,
            answerContent: answersMap.get(String(comment._id)) || []
        }));

        return res.json(commentsWithAnswers);
    },
    createComment: async (req, res) => {
        const courseId = req.params.id;

        const {body} = req.body;

        const selectedCourse = await CourseModel.findById(courseId);

        if (!selectedCourse) {
            return res.status(400).json({
                success: false,
                message: "Course does not exist"
            })
        }

        try {
            const comment = await CommentModel.create({
                body: body.trim(),
                creator: req.user._id,
                parentComment: null,
                course: courseId
            });

            return res.status(201).json(comment);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
    },
    answerComment: async (req, res) => {
        const parentCommentId = req.params.id;

        const {body} = req.body;

        try {
            const parentComment = await CommentModel.findById(parentCommentId);

            if (!parentComment) {
                return res.status(404).json({
                    success: false,
                    message: "Parent comment not found"
                });
            }

            const reply = await CommentModel.create({
                body: body.trim(),
                creator: req.user._id,
                parentComment: parentCommentId,
                course: parentComment?.course
            });

            return res.status(201).json(reply);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    acceptComment: async (req, res) => {
        const {id} = req.params;

        try {
            const acceptedComment = await CommentModel.findByIdAndUpdate(id, {isAccepted: true}, {new: true});

            if (!acceptedComment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found",
                });
            }

            return res.status(200).json({acceptedComment});

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    rejectComment: async (req, res) => {
        const {id} = req.params;

        try {
            const rejectedComment = await CommentModel.findByIdAndUpdate(id, {isAccepted: false}, {new: true});

            if (!rejectedComment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found",
                });
            }

            return res.status(200).json({rejectedComment});

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    deleteComment: async (req, res) => {
        const {id} = req.params;

        const deletedComment = await CommentModel.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({message: "Comment Not Found!"});
        }
        return res.json(deletedComment);
    },
}
