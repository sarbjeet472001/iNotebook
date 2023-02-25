import React from 'react'
import { useContext } from 'react'
import noteContext from './Context/NoteContext'

const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote,editNote}=context
  return (
    <>
    <div className="col-md-3 my-1">
    <div className= "card">
        <div className= "card-body">
          <div className="d-flex align-items-center">
          <h5 className= "card-title">{props.title}</h5>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(props._id);props.showAlert("Note Deleted Sucessfully","success");}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>props.showmodal(props.note)}></i>
          </div>
          <p className= "card-text">
            {props.description}
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Noteitem
