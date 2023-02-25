const mongoose=require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'inuser'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  tag:{
    type:String,
    default:"general"
  },
  date:{
    type:Date,
    default:Date.now
  }
});

const Note=mongoose.model('note',NoteSchema);
module.exports=Note;