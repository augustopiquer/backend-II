import { Router } from "express";
import CartController from '../controllers/cart.controller.js'
const router = Router()
const cartController= new CartController()

router.post('/', cartController.createCart)
router.get('/:cid', cartController.getCartById)
router.post('/:cid/product/:pid', cartController.addProductToCart)
router.delete('/:cid/product/:pid', cartController.deleteProducts)
router.put('/:cid', cartController.updateProductInCart)
router.put('/:cid/product/:pid', cartController.updateQttyCart)
router.delete('/:cid',cartController.emptyCart)
router.post('/:cid/purchase', cartController.ckeckout)

export default router