import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },

    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone number is required']
    },

    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'clint',
        enum:['client', 'admin','vendor', 'driver']
    },
    profile:{
        type:String,
        default:"https://unsplash.com/photos/a-man-wearing-glasses-and-a-black-shirt-iEEBWgY_6lA"
    },
},{timestamps:true})

const User = mongoose.model('User', userSchema)

export default User;