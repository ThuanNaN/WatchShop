const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    shippingInfo:{
        fullName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        phoneNumber: {
            type:String,
            required: true
        }
    },
    payment:{
        type:String,
        required:true,
        default:"Thanh toán khi nhận hàng"
    },
    orderItems:[
        {
            name:{
                type:String,
                required: true
            },
            price:{
                type:Number,
                required: true
            },
            quantity:{
                type:Number,
                required: true
            },
            image:{
                type:String,
                required: true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required: true
            },
        },
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },

    paidAt:{
        type:Date,
        required:true
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0,
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0,
    },
    discountRate:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Đang xử lý",
    },
    deliveredAt:Date,
},
{ timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)