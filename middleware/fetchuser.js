const jwt=require('jsonwebtoken');
const JWT_SECRET="Sarbjeetisahappyperson";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({err:"err occ"});
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:"err occ"});
    }
}

module.exports=fetchuser;