import express from 'express'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import './db.js'

import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'
import sessionRouter from './routes/session.router.js'
import initializePassport from './config/config.js'

import ProductManager from './dao/db/productsManager.db.js'
const manager = new ProductManager()

const app = express()
const PORT = 8080


//Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())
app.use(session({
    secret:'secretCoder',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*1000, httpOnly: true, secure: false}
}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)

//Listen
const httpServer = app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`); 
})