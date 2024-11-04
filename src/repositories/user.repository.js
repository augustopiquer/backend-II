import UserDao from '../dao/user.dao.js'
const userDao = new UserDao()

class UserRepository{
    async createUser (userData){
        return await userDao.save(userData)
    }

    async getUserById (id){
        return await userDao.findById(id)
    }

    async getUserByEmail(email){
        return await userDao.findOne({email})
    }
}

export default UserRepository