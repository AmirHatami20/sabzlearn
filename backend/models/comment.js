const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: "Course",
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        score: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        parentComment: {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
        isAccepted: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
