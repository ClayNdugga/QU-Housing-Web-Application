import express from 'express'
import passport from 'passport'

import {loginMain} from '../controllers/loginController.js';

const router = express.Router()



router.get('/', loginMain)



router.post('/', (req,res) => {
    console.log("Attempting to log in")
    passport.authenticate('local', {
        successRedirect: '/homes',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res)
})


export default router;
