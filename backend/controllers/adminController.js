import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"


// login user
const loginUser = async (req,res)=>{
    const {email,password}= req.body;
    try {
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.json({success:false,message:"Admin doesn't exist"});
        }

        const isMatch = (password===admin.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"});
        }
        const token = createToken(admin._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


export {loginUser};