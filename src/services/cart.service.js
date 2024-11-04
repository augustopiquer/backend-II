import CartRepository from '../repositories/cart.repository.js'
const cartRepository = new CartRepository()

class CartService{
    async createCart(){
        return await cartRepository.createCart()
    }
    async getCartById(id){
        return await cartRepository.getCartById(id)
    }
    async addProductToCart(cid, pid, qtty){
        return await cartRepository.addProductToCart(cid, pid, qtty)
    }
    async updateCart(id, cartData){
        return await cartRepository.updateCart(id, cartData)
    }
    async deleteCart(id){
        return await cartRepository.deleteCart(id)
    }
    async deleteProducts(cid, pid){
        return await cartRepository.deleteProducts(cid, pid)
    }
    async updateProductInCart(cid, products){
        return await cartRepository.updateProductInCart(cid, products)
    }
    async updateQttyCart(cid, pid, qtty){
        return await cartRepository.updateQttyCart(cid, pid, qtty)
    }
    async emptyCart(cid){
        return await cartRepository.emptyCart(cid)
    }
}
export default CartService