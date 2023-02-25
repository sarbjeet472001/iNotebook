import React, { useState } from "react";
import noteContext from "./Context/NoteContext";
import { useContext } from "react";

const Inputs = (props) => {
  const context=useContext(noteContext)
  const {addNote}=context;
  const [note,setNote]=useState({title:"",description:"",tag:""})
  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleonclick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Note added Successfully","success")
  }
  return (
    <>
      <div className="container my-3">
        <h2>Add Note</h2>
        <form>
          <div className= "mb-3">
            <label htmlFor="exampleInputEmail1" className= "form-label">
              Title
            </label>
            <input
              type="text"
              className= "form-control"
              id="exampleInputEmail1"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onchange}
              minLength={5}
            />
          </div>
          <div className= "mb-3">
            <label htmlFor="exampleInputPassword1" className= "form-label">
              Description
            </label>
            <input
              type="text"
              className= "form-control"
              id="exampleInputPassword1"
              value={note.description}
              name="description"
              onChange={onchange}
              minLength={5}
            />
          </div>

          <div className= "mb-3">
            <label htmlFor="exampleInputPassword1" className= "form-label">
              Tag
            </label>
            <input
              type="text"
              className= "form-control"
              id="exampleInputPassword1"
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </div>
          
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} onClick={handleonclick} className= "btn btn-primary">
            Add note
          </button>
        </form>
      </div>
    </>
  );
};

export default Inputs;
