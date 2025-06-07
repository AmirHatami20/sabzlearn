const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    }, {timestamps: true}
);

module.exports =  mongoose.model('UserCourse', userCourseSchema);
