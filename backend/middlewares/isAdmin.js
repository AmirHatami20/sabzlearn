module.exports = async (req, res, next) => {
    const isAdmin = req.user.role === 'ADMIN';

    if (isAdmin) return next();

    return res.status(403).json({
        success: false,
        message: 'this route is accessible only for admins.'
    });
};
