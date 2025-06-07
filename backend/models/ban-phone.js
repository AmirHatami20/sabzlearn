const mongoose = require('mongoose');

const banPhoneSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('BanUser', banPhoneSchema);
