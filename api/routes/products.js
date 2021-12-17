const router = require('express').Router();
const multer = require('multer');
const checkAuth = require('../auth/check-auth');
const productController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },

});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ?
            cb(null, true) : cb(new Error('File format not accepted'), false);
    }
});

router.get('/', productController.getAllProducts);

router.post('/', checkAuth, upload.single('image'), productController.saveProduct);

router.get('/:id', productController.getProductById);

router.patch('/:id', checkAuth, productController.updateProduct);

router.delete('/:id', checkAuth, productController.deleteProduct);

module.exports = router;