const express=require('express')
const router=express.Router();
const Note=require('../models/Note');
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes=await Note.find({user:req.user.id});
    res.json(notes);
})

router.post('/addnotes',fetchuser,[body('title','Enter a valid title').isLength({min:3}),
body('description','Enter a valid description').isLength({min:5}),],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tag}=req.body;
    try{
        let note=new Note({title,description,tag,user:req.user.id});
        const savednote=await note.save();
        res.json(savednote)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"some error occured"})
    }
})

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({error:"note doesn't exist"});
    }

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"some error occured"});
    }
    
})
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    
    try{
        let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({error:"note doesn't exist"});
    }

    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id);
    res.json({sucess:"node deleted successfuly",note:note})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"some error occured"});
    }

})

module.exports=router;