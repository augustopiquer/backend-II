import { createHash, isValidPassword} from '../utils/util.js'
import UserRepository from '../repositories/user.repository.js'
import CartService from './cart.service.js'
const userRepository = new UserRepository()
const cartService = new CartService()

class UserService {
    async registerUser (userData) {
        const userExists = await userRepository.getUserByEmail(userData.email)
        if (userExists) throw new Error("Email is already registered")
        
        userData.password = createHash(userData.password)
        const newCart = await cartService.createCart()
        userData.cart = newCart._id

        return await userRepository.createUser(userData)
    } //ver si se le agrega el carrito y se agrega una propiedad nueva

    async loginUser(email, password){
        const user = await userRepository.getUserByEmail(email)
        if(!user || !isValidPassword(password, user)) throw new Error("Incorrect credentials")
        return user
    }
}

export default UserService