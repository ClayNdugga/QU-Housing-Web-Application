import mongoose from "mongoose";
// import marked from "marked";
// import slugify from "slugify";




const homeSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    address:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    description:{
        type: String,
        // required: true
    },
    rating:{                //
        type: Number,       //
        required: true      //
    },                      //
    bedrooms:{
        type: Number,
        required: true
    },
    bathrooms:{
        type: Number,
        required: true        
    },
    type:{
        type: String,
        required: true    
    },
    reviews:[
        // {
        //   type: mongoose.Schema.Types.ObjectId
        //    ref: "reviews"
        // }
      ],
    createdBy:{
        type: Object,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
        // default: () => Date.now()
    }
    //,
    // slug:{
    //     type: String,
    //     required: true,
    //     unique: true
    // }

})

// homeSchema.pre('validate', function(next) {
//     if (this._id) {
//         this.slug = slugify(this.title, {lower: true, strict: true})
//     }

//     next()
// })

//https://www.bezkoder.com/mongoose-one-to-many-relationship/


// module.exports = mongoose.model('Home', homeSchema)

export default mongoose.model('HomeObject', homeSchema)