const mongoose=require('mongoose');
//for hashing password
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:[true,"Email required"],
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
})

//Hashing before saving password in database - stores encrypted password
//middleware for hashing  -> UserSchema.pre
UserSchema.pre("save",async function(next){
    if(!this.isModified("Password")){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.Password=await bcrypt.hash(this.Password,salt);
    next();
});

const User=mongoose.model('User',UserSchema);
module.exports=User;