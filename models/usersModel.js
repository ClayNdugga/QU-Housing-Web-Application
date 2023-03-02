
import mongoose from "mongoose";
// import marked from "marked";
// import slugify from "slugify";




const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type: String,
        required: true
    },
    profilepic:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
        // default: () => Date.now()
    }

})

//mario https://media.pocketgamer.com/artwork/na-wrds/mario-2_png_320.webp
//luigi https://thechicagogenius.com/sites/default/files/luigi%20headshot%20cropped.png
//yoshi https://pm1.narvii.com/6523/22af61238b1242eea42d9d1520fb47e25c036b78_hq.jpg
//mushroom https://w7.pngwing.com/pngs/464/1010/png-transparent-super-mario-red-toad-new-super-mario-bros-super-mario-bros-toad-super-mario-super-mario-bros-nintendo-computer-wallpaper-thumbnail.png
//green mushroom https://static.wikia.nocookie.net/mario/images/7/74/Nsmb-mushroom-1up.jpg/revision/latest?cb=20071117094510


// module.exports = mongoose.model('Home', homeSchema)

export default mongoose.model('UserObject', userSchema)