import express from 'express'
import { createHome, getHomes, getHomesPost,getSpecificHome,commentOnHome,deleteHome,patchHome} from '../controllers/homesController.js';
import {checkAuthentication} from "../passport-config.js"


const router = express.Router()



router.get('/',getHomes)
router.post('/',getHomesPost)


router.get('/new', checkAuthentication,(req,res) => {res.render("createHome.ejs", {req: req})})
router.post('/new', createHome)

router.get('/singlehometest', (req,res) => {res.render("home.ejs", {req: req})})


router.get('/:id', getSpecificHome)
router.post('/:id', checkAuthentication, commentOnHome)
router.delete('/:id',deleteHome)
router.patch('/:id', patchHome)



export default router;


 
    