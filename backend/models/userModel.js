const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength: [30,"Max length is 30 characters"],
        minLength:[4,"Min length is 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[6,"Password should be geater than 8 characters"],
        select:false
    },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
},
{ timestamps: true }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SC,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// Compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
    // return await bcrypt.hash(this.password, 10) === this.password
}

// generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // hasing  and adding resetPasswordToken to userSchema
    this.resetPasswordToken =  crypto
                                .createHash("sha256")
                                .update(resetToken)
                                .digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User",userSchema)