const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            course: {
                type: mongoose.Types.ObjectId,
                ref: "Course",
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now
            },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Basket", basketSchema);
