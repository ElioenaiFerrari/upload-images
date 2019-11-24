const multer = require('multer');
const path = require('path');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', '..', '..', 'public', 'images'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isAccept = [
            'image/png',
            'image/jpg',
            'image/jpeg'
        ].find(acceptFormat => acceptFormat == file.mimetype);

        if (isAccept) {
            return cb(null, true);
        }

        return cb(null, false);
    }
}))