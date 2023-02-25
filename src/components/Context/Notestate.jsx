import React, { useState } from 'react';
import noteContext from './NoteContext';

const Notestate = (props) => {
  const [notes,setNotes]=useState([])

  const getNote=async()=>{
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
     // body data type must match "Content-Type" header
    });
    const json= await response.json();
    console.log(json)
    setNotes(json)
  }
  const addNote=async(title,description,tag)=>{
    const response = await fetch(`http://localhost:5000/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    
    const note=await response.json();
    setNotes(notes.concat(note));

  }

  const deleteNote=async(id)=>{
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
       // body data type must match "Content-Type" header
    });
    console.log(id);
    const newNotes=notes.filter((note)=>{
      return note._id!==id
    })
    setNotes(newNotes)
  }

  const editNote=async(id,title,description,tag)=>{
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    let newNotes=JSON.parse(JSON.stringify(notes))
    for(let i=0;i<newNotes.length;i++){
      let element=newNotes[i];
      if(element._id==id){
        newNotes[i].title=title;
        newNotes[i].description=description;
        newNotes[i].tag=tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <noteContext.Provider value={{notes ,setNotes,addNote,deleteNote,getNote,editNote}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default Notestate
