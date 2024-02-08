import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

//Register auth
const registerController =async ( req, res) =>{
    try {
        const {userName, email, password, phone, address} = req.body

        // validation  of user Registration form
        console.log(userName , email, password, phone, address)

        if(!userName || !email || !password || !phone || !address){
            return res.status(500).send({
                success: false,
                message:"Please provide valid filed in Registration form"
            })

        }

        // Chek user exist on Database or Not
        const existing = await User.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:"Email already register"
            })
        }

        //password hassing with the help of becript js
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt)

        // if user is not existe on databasse then create new Registration Form
        const user = await User.create({
            userName,
            email,
            password:hashPassword,
            address,
            phone
            })
        res.status(201).send({
            success: true,
            message:"SuccessFully Register ",
            user
        })       
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error to Registration API'  ,
        })
    }
};

//################################################################################################################
//LOGIN 
const loginController = async(req, res)=>{
    try {
        //get email and password to database
        const {email,password} = req.body
        
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please provide valid email and password",
            })
        }

        
        //Check User 
       
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User Not Match"
            })
        }
            //password match with compare  function
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }

        //jwt token create
        const token = JWT.sign({id: user._id},  process.env.JWT_SECRET , {
            expiresIn:"7d",
        })
        res.status(200).send({
            success:true,
            message:"Login SuccesFully",
            token,
            user,
           
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login API",
            error
        })
    }
}

export { registerController,loginController};