import CartModel from './models/carts.model.js'
import ProductModel from './models/products.model.js'

class CartDao{
    async create(){
        const cart = new CartModel()
        return await cart.save()
    }
    async findById(id){
        return await CartModel.findById(id).populate('products.product', '_id title price')
    }
    async update(id, cartData){
        return await CartModel.findByIdAndUpdate(id, cartData)
    }
    async delete(id){
        return await CartModel.findByIdAndDelete(id)
    }
}

export default CartDao