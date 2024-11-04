import passport from 'passport'
import jwt from 'passport-jwt' //Estrategia para JWT
import GitHubStrategy from 'passport-github2' //Estrategia con Github
import GoogleStrategy from 'passport-google-oauth20' //Estrategia con Google

import UserModel from '../dao/models/users.model.js'

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const initializePassport = () =>{
    //strategia para JWT
    passport.use('current', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([ cookieExtractor]),
        secretOrKey: 'coderhouse', //misma palabra que pusimos en la App!
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
    
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user = await UserModel.findById({_id: id})
        done(null, user)
    })

    //strategia con GitHub
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.e97407450de44466',
        clientSecret:'39610f5586a850dbe830ffc903a565d3a99fdd64',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async(accessToken, refreshToken, profile, done)=>{
        //sugerencia:
        console.log('Profile', profile);
        try {
            let user = await UserModel.findOne({email: profile._json.email})
            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age:15,
                    email: profile._json.email,
                    password: ''
                }
                let result = await UserModel.create(newUser)
                done(null,result)
            } else {
                done(null,user)
            }
        } catch (error) {
            return done(error)
        }
        
    }))

    //strategia para Google
    passport.use('google', new GoogleStrategy({
        clientID: '42043414310-d97je3itvd97094ievlmndlohlkq5ss9.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8080/api/sessions/googlecallback'

    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            let user = await UserModel.findOne({email: profile._json.email})
            if(!user) {
                let newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    age:15,
                    email: profile._json.email,
                    password: ''
                }
                let result = await UserModel.create(newUser)
                done(null,result)
            } else {
                done(null,user)
            }
        } catch (error) {
            return done(error)
        }
    }))
}

//creamos el cookie extractor
const cookieExtractor = (req) => {
    let token = null
    if( req && req.cookies ){
        token = req.cookies['coderCookieToken']
    }
    return token
}

export default initializePassport