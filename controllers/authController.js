import User from "../models/userModel.js"

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

        // if user is not existe on databasse then create new Registration Form
        const user = await User.create({userName,email, password, address, phone})
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
}

export default registerController