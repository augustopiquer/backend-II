import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = Router()
const userController = new UserController()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current', passport.authenticate('current',{session: false}) , userController.current)
router.post('/logout', userController.logout)

router.get('/github', passport.authenticate('github',{scope: ['user:email']}), userController.github)
router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), userController.githubcallback)

router.get('/google', passport.authenticate('google',{scope: ['profile','email']}), userController.google)
router.get('/googlecallback', passport.authenticate('google',{failureRedirect:'/login'}), userController.googlecallback)

export default router