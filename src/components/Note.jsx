import React, { useEffect, useRef,useState } from "react";
import Noteitem from "./Noteitem";
import { useContext } from "react";
import noteContext from "./Context/NoteContext";
import Inputs from "./Inputs";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  const navigate=useNavigate();
  const ref = useRef(null);
  const refc=useRef(null);
  const d = useContext(noteContext);
  const { notes, getNote,editNote} = d;
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleonclick = (e) => {
    e.preventDefault();
    console.log(note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refc.current.click()
    props.showAlert("Note edited successfully","success");
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }else{
      navigate('/login')
      props.showAlert("Login first to access notes","danger")
    }
  }, []);

  const showmodal = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  };
  return (
    <>
      <Inputs showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    minLength={5}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refc}
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleonclick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.length===0 && 'No items to show'}
        <div className="row">
          {notes.map((note) => {
            return (
              <Noteitem
                showAlert={props.showAlert}
                showmodal={showmodal}
                note={note}
                _id={note._id}
                key={note._id}
                title={note.title}
                description={note.description}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
