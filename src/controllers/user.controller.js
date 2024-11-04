import jwt from 'jsonwebtoken'
import UserService from '../services/user.service.js'
import UserDto from '../dto/user.dto.js'
const userService = new UserService()
//const userDto = new UserDto(user)

class UserController{
    async register(req, res){
        const { first_name, last_name, email, password, age } = req.body;
        try {
          // registrar un nuevo usuario:
          const newUser = await userService.registerUser({
            first_name,
            last_name,
            email,
            password, //lo hashea en Service
            age,
            role: "user",
          });
       
          //generamos un token
          const token = jwt.sign({
            user: `${newUser.first_name} ${newUser.last_name}`,
            email: newUser.email,
            role: newUser.role,
            cart: newUser.cart
          }, 'coderhouse', {expiresIn:'1h'})
          // return token
          // console.log(token);

          res.cookie("coderCookieToken", token, {
            maxAge: 60*60*1000,
            httpOnly: true
          })
          res.redirect("/api/sessions/current");
        } catch (error) {
          console.log(error);
          res.status(500).send("Server Error in the Register");
        }    
    }

    async login(req, res){
        const {email, password} = req.body
        try {
          //verificamos  el email
          const loggedUser = await userService.loginUser(email,password)
          const token = jwt.sign({
            user: `${loggedUser.first_name} ${loggedUser.last_name}`,
            email: loggedUser.email,
            role: loggedUser.role,
            cart: loggedUser.cart
          }, 'coderhouse', {expiresIn:'1h'})
            
          res.cookie('coderCookieToken',token,{
              maxAge:60*60*1000,
              httpOnly:true
          })
          res.redirect('/api/sessions/current')
        } catch (error) {
            res.status(500).send('Server Error in Login')
        }
    }

    async current(req, res){
      if (req.user) {
        const user = req.user   //console.log(user); // Añade esta línea, luego borrar
        const userDTO = new UserDto(user) //usar en service, ver despues
        res.render('profile', {user: userDTO}) //luego ira home(cambiar por products)
      } else {
        res.send('Unauthorized')
      }
    }

    async logout(req, res){
        res.clearCookie('coderCookieToken')
        res.redirect('/login')
    }

    async github(req, res){}

    async githubcallback(req, res){
      req.session.user = req.user
      req.session.login = true
      res.redirect('/profile')
    }

    async google (req, res){}

    async googlecallback (req, res){
      req.session.user = req.user
      req.session.login = true
      res.redirect('/profile')
    }
}

export default UserController