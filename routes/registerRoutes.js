import express from 'express'
import { view, newUser} from '../controllers/registerController.js';

const router = express.Router()



router.get('/', view)

router.post('/', newUser)


export default router;


 
    