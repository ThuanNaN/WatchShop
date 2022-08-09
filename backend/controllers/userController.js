const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//Register user
exports.registerUser = catchAsyncErrors( async (req,res,next) =>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=",
        
    });

    sendToken(user,201,res);
});


//Login User
exports.loginUser = catchAsyncErrors( async (req,res,next)=>{
    const {email,password} = req.body;
    // checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email & Password",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));   
    }

    sendToken(user,200,res);

});


//Logout User
exports.logout = catchAsyncErrors(async (req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success:true,
        message:"logged out",
    })
})

//forgot password
exports.forgotPassword = catchAsyncErrors( async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if (!user){
        return next( new ErrorHander("User not found",404));
    }
    // get resetPassword
    const resetToken =  user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset token is : - \n\n ${resetPasswordUrl} \n\nIf you have not request this email then, please  ignore it`
    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfullt`
        })

    }catch(error){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false});
        return next(new ErrorHander(error.message,500));
    }
});

//reset password
exports.resetPassword = catchAsyncErrors( async (req,res,next)=>{
    
    //creating token hash
    const resetPasswordToken =  crypto
                    .createHash("sha256")
                    .update(req.params.token)
                    .digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    if (!user){
        return next( new ErrorHander("Reset Password Token is invalid or has been expired",400));
    }

    if (req.body.password!==req.body.confirmPassword){
        return next( new ErrorHander("Password does not password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200, res);

});


//Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});

//Update User password
exports.updateUserPassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));   
    }
    
    if(req.body.newPassword !== req.body.confirmPassword ){
        return next(new ErrorHander("Invalid email or password",401)); 
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
})



//Update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        avatar:req.body.avatar
    };

    const user = await User.findByIdAndUpdate(req.user.id,newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success:true,
        // user
    })
})

//get all users (admin)
exports.getAllUser = catchAsyncErrors( async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})


//get single users (admin)
exports.getSingleUser = catchAsyncErrors( async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHander( `User dose not exist with ID: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user,
    })
})


//Update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{

    const newUserDate = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id,newUserDate, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    })
})

//Delete User  --Admin
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.params.id);
    if(!user){
        return next(ErrorHander(`User does not exist with Id: ${req.params.id}`, 400))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User deleted successfully!"
    })
})