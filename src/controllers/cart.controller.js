import TicketModel from '../dao/models/tickets.model.js'
import UserModel from '../dao/models/users.model.js'
import CartService from '../services/cart.service.js'
import ProductService from '../services/product.service.js'
import { Total } from '../utils/util.js'
const cartService= new CartService()
const productService = new ProductService()

class CartController{
    async createCart(req, res){
        try {
            const newCart = await cartService.createCart()
            res.status(201).json(newCart)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async getCartById(req, res){
        const {cid} = req.params
        try {
            const cart = await cartService.getCartById(cid)
            if(!cart) return res.status(404).send('Cart Not found')
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
        return await cartService.getCartById(cid)
    }
    async addProductToCart(req, res){
        const cid = req.params.cid
        const pid = req.params.pid
        const qtty = req.body.quantity || 1
        try {
            const updatedCart = await cartService.addProductToCart(cid, pid, qtty)
            res.status(200).json(updatedCart.products)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async deleteProducts(req, res){
        const {cid, pid} = req.params
        try {
            const updateCart = await cartService.deleteProducts(cid, pid)
            res.status(200).json({message:'Product removed',updateCart})            
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async updateProductInCart(req, res){
        const {cid} = req.params
        const {products} = req.body
        try {
            const cartsById = await cartService.updateProductInCart(cid,products)
            res.status(200).json({message:'Updated Cart Sucessfully'})
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async updateQttyCart(req, res){
        const cid = req.params.cid
        const pid = req.params.pid
        const qtty = req.body.quantity
        try {
            const cart = await cartService.updateQttyCart(cid, pid, qtty)
            res.status(200).json({message:'Product quantity updated',cart})
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async emptyCart(req, res){
        const {cid} = req.params
        try {
            const updatedCart = await cartService.emptyCart(cid)
            res.status(200).json({message: 'Products removed, your Cart is empty', updatedCart})
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    async ckeckout(req, res){
        const cid = req.params.cid
        try {
            const cart = await cartService.getCartById(cid)
            const products = cart.products

            const unProducts = []
            const buyProducts = []

            for (const item of products){
                const pid = item.product
                const product = await productService.getProductById(pid)
                if(product.stock >= item.quantity){
                    product.stock-= item.quantity
                    await product.save()
                    buyProducts.push(item)
                } else {
                    unProducts.push(item)
                }
            }
            const userCart = await UserModel.findOne({cart: cid})

            const ticket = new TicketModel({
                code: cid.code,
                purchase_datetime: new Date(),
                amount: Total(buyProducts),
                purchaser: userCart.email
            })
            await ticket.save()

            cart.products = unProducts
            // cart.products = cart.products.filter(items=>unProducts.some(pid=>pid.equal))
            await cart.save()

            // await sendEmail(userCart.email, userCart.first_name, ticket._id)

            res.render('checkout',{
                customer: userCart.first_name,
                email: userCart.email,
                nTicket: ticket._id,
                unavailableProducts: unProducts.map((item)=>item.product)
            })
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}
export default CartController