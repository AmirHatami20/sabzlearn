const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        fullDescription: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        support: {
            type: String,
            required: false,
        },
        shortName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 100,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    {timestamps: true}
);

// Virtual
courseSchema.virtual("session", {
    ref: "Session",
    localField: "_id",
    foreignField: "course",
});

courseSchema.virtual("comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "course",
});

module.exports = mongoose.model("Course", courseSchema);
