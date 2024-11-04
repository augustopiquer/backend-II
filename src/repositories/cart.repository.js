import CartDao from '../dao/cart.dao.js'
const cartDao = new CartDao()
import ProductDao from '../dao/product.dao.js'
const productDao = new ProductDao()

class CartRepository {
    async createCart(){
        return await cartDao.create({products:[]})
    }
    async getCartById(id){
        return await cartDao.findById(id)
    }
    async addProductToCart(cid, pid, qtty){
        const cartsById = await cartDao.findById(cid)
        if(!cartsById) throw new Error('Cart not found')
        
        const product = await productDao.findById(pid)
        if(!product) throw new Error('Product not found');
        
        const existProduct = cartsById.products.findIndex(p=>p.product.toString() === pid)
        if(existProduct !== -1){
            cartsById.products[existProduct].quantity += qtty    
        } else {
            cartsById.products.push({product: pid, quantity: qtty})
        }
        cartsById.markModified('products')
        return await cartsById.save()
    }
    async updateCart(id, cartData){
        return await cartDao.update(id, cartData)
    }
    async deleteCart(id){
        return await cartDao.delete(id)
    }
    async deleteProducts(cid, pid){
        const cart = await cartDao.findById(cid)
        if(!cart){
            throw new Error('Cart not found')
        }
        const initialLength = cart.products.length
        cart.products = cart.products.filter( p=>p.product._id.toString() !== pid)
        if(cart.products.length !== initialLength){
            return await cart.save(cart.products)
        } else {
            throw new Error('Product not found in cart')            
        }        
    }
    async updateProductInCart(cid, products){
        return await cartDao.update(cid, {products})
    }
    async updateQttyCart(cid, pid, qtty){
        const cart = await cartDao.findById(cid)
        if(!cart) throw new Error('Cart not found')

        const prodIndex = cart.products.findIndex(item=>item.product._id.toString() === pid)
        console.log(prodIndex);
        
        if(prodIndex !== -1){
            cart.products[prodIndex].quantity = qtty
            cart.markModified('products')
        } else {
            throw new Error("Product not found in Cart");
        }
        return await cart.save()
    }
    async emptyCart(cid){
        const cart = await cartDao.findById(cid)
        if(!cart){
            throw new Error('Cart not found')
        }
        cart.products = []
        return await cart.save()
    }
}

export default CartRepository