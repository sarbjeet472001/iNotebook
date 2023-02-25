const mongoose=require("mongoose");
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const MONGO_URI=process.env.MONGO_URI

const connectToDb=()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URI).then(()=>{
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=connectToDb;
