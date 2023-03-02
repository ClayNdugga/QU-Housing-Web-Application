import userObject from '../models/usersModel.js';
import bcrypt from 'bcrypt'



const profilepics = ['https://media.pocketgamer.com/artwork/na-wrds/mario-2_png_320.webp',
                'https://thechicagogenius.com/sites/default/files/luigi%20headshot%20cropped.png',
                'https://pm1.narvii.com/6523/22af61238b1242eea42d9d1520fb47e25c036b78_hq.jpg',
                'https://w7.pngwing.com/pngs/464/1010/png-transparent-super-mario-red-toad-new-super-mario-bros-super-mario-bros-toad-super-mario-super-mario-bros-nintendo-computer-wallpaper-thumbnail.png',
                'https://oyster.ignimgs.com/mediawiki/apis.ign.com/new-super-mario-bros-u/0/00/3a083df05201781d56433d893565e39edca3e161_large.jpg'
            ]   


export const view = async (req,res) => {
    res.render('register.ejs',{req:req})
}



export const newUser = async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        // console.log(hashedPassword)
        let user = new userObject({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            profilepic: profilepics[Math.floor(Math.random() * 5)]
        })
        await user.save()
        console.log("User created sucessfully")
        res.redirect('/login')
    } catch(err) {
        console.log("Error creating user")
        res.send(err)
        // res.redirect('/register')
    }
}



