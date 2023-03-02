import { v4 as uuidv4 } from 'uuid';
import HomeObject from '../models/homesModel.js';
import commentObject from '../models/commentModel.js';




// export const createHome = (req,res) => {
//     const home = req.body
//     homes.push({...home, id: uuidv4()})

//     res.send(`Home with address ${home.address} added to the database`)
// }

export const createHome = async (req,res) => {
    let home = new HomeObject({
        // _id: uuidv4(),
        address: req.body.address,
        postalCode: req.body.postalCode,
        description: req.body.desc,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        rating: req.body.rating,
        type: req.body.type,
        createdBy: req.user
    })
    try{
        home = await home.save()
        res.redirect(`/homes/${home.id}`)
        console.log("Home created successfully")
    } catch (err) {
        // console.log(err)
        console.log("Error creating home")
        res.send(err)
    }

}

//{address: { "$regex": req.body.search, "$options": "i" }}

export const getHomes = async (req,res) => {
    const homes = await HomeObject.find().sort({createdAt: 'desc'})
    res.render("viewHomes.ejs", {homes: homes, req: req})
}

export const getHomesPost = async (req,res) => {
    const homes = await HomeObject.find({address: { "$regex": req.body.search, "$options": "i" }}).sort({createdAt: 'desc'})
    res.render("viewHomes.ejs", {homes: homes, req: req})
}



export const commentOnHome = async (req,res) => {
    console.log(req.body.comment)
    const home = await HomeObject.findById(req.params.id)
    console.log(home)
    let comment = new commentObject({
        user: req.user,
        home: home.id,
        desc: req.body.comment
    })
    try {
        comment = await comment.save()

        await HomeObject.findByIdAndUpdate(
            req.params.id,
            { $push: {reviews: comment} },
            { new: true, useFindAndModify: false }
          )
        res.render("home.ejs", {home: home, req, req})
        console.log("comment posted successfully")
    } catch (err) {
        console.log("Error creating home")
        res.send(err)
    }

}




// export const getSpecificHome = (req,res) => {
//     const {id} = req.params
//     const foundHome = homes.find((home) => home.id == id)
//     res.send(foundHome)
// }
export const getSpecificHome = async (req,res) => {
    console.log(req.params.id)
    const home = await HomeObject.findById(req.params.id)
    if (home == null) res.redirect('/')
    res.render("home.ejs", {home: home, req, req})
}






export const deleteHome = (req,res) => {
    const {id} = req.params
    homes = homes.filter((home) => home.id != id)
    res.send(`Home with ${id} deleted from database`)
}







export const patchHome = (req,res) => {
    const {id} = req.params
    const {style, address, bedrooms, bathrooms} = req.body

    const home = homes.find((home) => home.id == id)

    if(style) home.style = style
    if(address) home.address = address
    if(bedrooms) home.bedrooms = bedrooms
    if(bathrooms) home.bathrooms = bathrooms
    
    res.send(`Home with id ${id} has been updated`);
}