import mongoose from 'mongoose'
mongoose.pluralize(null)
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts'
            
    },
    role: {
        type: String,
        enum:['admin', 'user'],
        default:'user'
    }
})
const UserModel = mongoose.model('users', userSchema)
export default UserModel