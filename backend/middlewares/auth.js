const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
    let token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decoded.id).select('-password');

        next()
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: 'User With this Token in not founded'
        })
    }
};
