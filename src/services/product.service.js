import ProductRepository from '../repositories/product.repository.js'
const productRepository = new ProductRepository()

class ProductService{
    async createProduct(productData){
        return await productRepository.createProduct(productData)
    }
    async getProductById(id){
        return await productRepository.getProductById(id)
    }
    async getProducts(query){
        return await productRepository.getProducts(query)
    }
    async updateProduct(id, productData){
        return await productRepository.updateProduct(id, productData)
    }
    async deleteProduct(id){
        return await productRepository.deleteProduct(id)
    }
}

export default ProductService