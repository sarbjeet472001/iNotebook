const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET="Sarbjeetisahappyperson";
const fetchuser=require('../middleware/fetchuser')

router.post('/signup',[body('email').isEmail(),
body('password').isLength({ min: 5 }),],async(req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            success=false
            return res.status(400).json({error:"user already exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        user=await User.create({
            name: req.body.name,
            email:req.body.email,
            password: hash
        })
        const data={
            user:{
                id:user.id
            }
        }
        var token = jwt.sign(data,JWT_SECRET);
        console.log(token)
        success=true
        res.json({success,token:token})
    }catch(err){
        console.log(err);
        res.status(500).send("some error occured")
    }
})

router.post('/login',[body('email').isEmail(),
body('password').exists(),],async(req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            success=false
            return res.status(400).json({error:"user doesnt exist"})
        }
        const pc=await bcrypt.compare(password,user.password)
        if(!pc){
            success=false
            return res.status(400).json({error:"wrong password"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        var token = jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,token});
    }catch(err){
        console.log(err);
        res.status(500).send("some error occured")
    }
})

router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        userId=req.user.id;
        let user=await User.findById(userId).select('-password')
        res.send(user)
    }catch(err){
        console.log(err);
        res.status(500).send("some error occured")
    }
})

module.exports=router;