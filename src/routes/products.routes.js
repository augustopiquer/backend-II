import {Router} from 'express'
import ProductController from '../controllers/product.controller.js'
import passport from 'passport'

const router = Router()
const productController = new ProductController()

router.get('/',passport.authenticate('jwt',{session:false}),productController.getProducts)
router.get('/:pid', productController.getProductById)
router.post('/', productController.createProduct) //addProduct
router.put('/:pid', productController.updateProduct)
router.delete('/:pid', productController.deleteProduct)

export default router