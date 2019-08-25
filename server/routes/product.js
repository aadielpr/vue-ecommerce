const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const Authentication = require('../middlewares/authen');
const image = require('../middlewares/image');
const deleteImage = require('..//middlewares/deleteImage')
const updateImage = require('../middlewares/updateImage')
const Authorization = require('../middlewares/authorProduct')
router.use(Authentication)

router.post('/', Authorization, image.multer.single('image'), image.sendUploadToGCS, ProductController.create)
router.delete('/:id', Authorization, ProductController.destroy, deleteImage)
router.put('/:id', Authentication, updateImage.multer.single('image'), updateImage.sendUploadToGCS, ProductController.update)
router.get('/', ProductController.loadProduct)
router.get('/:id', ProductController.findOne)
module.exports = router