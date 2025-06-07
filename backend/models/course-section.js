const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
        },
    }, {timestamps: true});

module.exports = mongoose.model('Section', sectionSchema);
