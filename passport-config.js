// const localStrategy = require('passport-local').Strategy
import passport from 'passport'
import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
import userObject from './models/usersModel.js';


export function initializePassport(passport) {
    passport.use(new LocalStrategy.Strategy({usernameField: 'email'}, function (email, password, done) {
        userObject.findOne({email: email}, function (err, user) {
            if (err) return done(err)
            if (!user) return done(null, false, {message:"Incorrect Email"})

            console.log("comparing passwords")
            console.log(password)
            console.log(user.password)
            
            bcrypt.compare(password, user.password, function (err,res) {
                if (err) return done(err)
                if (res === false) return done(null, false, {message: "Incorrect Password"})
                return done(null,user)
            })
        })
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        userObject.findById(id, (err,user) => {
            done(err,user)
        })
    })

}

export function checkAuthentication(req,res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

export function checkNoAuthenticaion(req,res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}






// module.exports = initialize
//export default initializePassport














// function initialize(passport, getUserByEmail) {
    
    //WBS 

    // const authenticateUser = async (email, password, done) => {
    //     const user = getUserByEmail(email)
    //     console.log("passport-config running")

    //     if (user == null) {
    //         return done(null, false, {message:`No user with the email ${email}`})
    //     }

    //     try {
    //         if (await bcrypt.compare(password, user.password)) {
    //             return done(null, user)
    //         } else {
    //             return done(null, false, {message: 'Password Incorrect'})
    //         }


    //     } catch(err) {
    //         return done(err)
    //     }

    // }
    //passport.use(new LocalStrategy.Strategy({usernameField: 'email'}, authenticateUser))


// }
