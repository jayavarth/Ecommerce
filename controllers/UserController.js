const User=require('../models/UserModel')
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')

const AddUser=async(req,res)=>{
    try{
        const {Username,Email,Password}=req.body;
        const Adduser=new User({Username,Email,Password});
        await Adduser.save();
        res.send("user added success");
    }
    catch(err){
        console.error(err);
    }
};

const Login=async(req,res)=>{
    const {Email,Password}=req.body;
    const user=await User.findOne({Email});
    try{
        if(!user){
            return res.status(404);
        }
        const validpasssword= await bcrypt.compare(Password,user.Password);
        if(!validpasssword){
            return res.status(404);
        }
        const token= jwt.sign({userId:user._id},"secret_key",{
            expiresIn:"1h"
        });
        res.json({token});
    }catch(err){
        console.error(err)
    }
}

module.exports={AddUser,Login};