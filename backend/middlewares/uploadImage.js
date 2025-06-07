const multer = require('multer');

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'video/mp4'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, .png, .webp, and .mp4 formats are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;



