const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLenght:[8,"asdsad"]
    },
    image:{
        type:String,
        required: [true,"Please Enter product image" ]
    },
    category:{
        type:String,
        required:[true,"Please Enter product Category (Male/Female)"]
    },

    brand:{
        type:String,
        required:[true,"Please Enter product Brand"]
    },

    color:{
        type:String,
        required:[true,"Please Enter product Color"]
    },

    strap:{
        type:String,
        required:[true,"Please Enter product Strap"],
    },

    discount:{
        type:Number,
        required: true,
        default:0,
    },
    
    stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLenght:[4,"asddasdasdsad"],
        default:1
    },
},
{ timestamps: true }
)

module.exports = mongoose.model("Product",productSchema);