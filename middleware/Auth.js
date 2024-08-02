const jwt=require('jsonwebtoken');

const Auth=(req,res,next)=>{
    // const token=req.header('Authorization').replace("Bearer"," ");        ->token will be send with bearer (when fetched from fronted) so replace is used to remove beare
    //or
    const token=req.header("Authorization").split(" ")[1];
    if(!token) return res.status(401).json({error:"Token required"});
    try{
        const decoded=jwt.verify(token,"secret_key");//verify the token generated using jwt.sign
        req.user=decoded.userId;
        next();
    }
    catch(err){
        res.status(401).json({error:"Invalid token"});
    }
};

module.exports=Auth;
