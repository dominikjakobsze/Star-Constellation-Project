const multer = require('multer');
const path = require('path');
const { env } = require('./config/db');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (env === 'test'){
            cb(null, 'tests/uploads-test/');
        } else{
            cb(null, 'uploads/');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Define file filter for uploaded files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File type must be image/'));
    }
};

// Define Multer middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5000000 } // set max file size to 5MB
});

module.exports = upload;
