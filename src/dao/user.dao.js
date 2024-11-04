import UserModel from './models/users.model.js'

class UserDao {
    async findById(id){
        return await UserModel.findById(id)
    }

    async findOne(query){
        return await UserModel.findOne(query)
    }

    async save(userData){
        const user = new UserModel(userData) //ver si va o no un NEW
        return await user.save()
    }
}

export default UserDao