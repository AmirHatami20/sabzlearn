const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        isFree: {
            type: Boolean,
            default: true,
        },
        duration: {
            type: Number,
            default: 0,
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        section: {
            type: mongoose.Types.ObjectId,
            ref: 'Section',
            required: true,
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('Session', sessionSchema);
