const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        shortName: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        isPublished: {
            type: Boolean,
            default: false,
            required: true,
        }
    }, {timestamps: true}
);

module.exports = mongoose.model("Article", articleSchema);
