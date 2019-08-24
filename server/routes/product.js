const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const Authentication = require('../middlewares/authen');
const image = require('../middlewares/image');
// const Authorization = require('../middlewares/')
router.use(Authentication)

router.post('/', image.multer.single('image'), image.sendUploadToGCS, ProductController.create)
router.get('/', ProductController.loadProduct)
router.get('/:id', ProductController.findOne)
module.exports = router