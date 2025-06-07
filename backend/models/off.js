const mongoose = require("mongoose");

const offSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        percent: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: "Course",
        },
        max: {
            type: Number,
            required: true,
            min: 0
        },
        uses: {
            type: Number,
            default: 0,
            required: true
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },

        expiresAt: {
            type: Date
        },
        isPublic: {
            type: Boolean,
            default: true
        },
        allowedUsers: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }],
        usedBy: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }],
    }, {timestamps: true});

module.exports = mongoose.model("Off", offSchema);
