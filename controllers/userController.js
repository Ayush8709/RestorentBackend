// Get User Information from backend

import User from "../models/userModel.js";

const getUserController = async(req, res) =>{
     
        try {
            //Find user with jwt token 
            const user = await User.findById({_id:req.body.id})
            //validation
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:"User not Found"
                })
            }

            res.status(200).send({
                success:true,
                message:"User get Successfully",
                user
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error in get user Api",
                error
            })
        }
}

//Update User 
const updateUserController = async(req, res)=>{
    try {
        //find User
        const user = await User.findById({_id: req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        //updata
        const {userName, address, phone}= req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:"User Update Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in updaUserProfile",
            error
        })
    }
}

export  {getUserController, updateUserController}