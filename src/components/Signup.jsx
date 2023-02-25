import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const onchang=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleclick=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const json=await response.json();
          console.log(json.success)
          if(json.success){
            localStorage.setItem('token',json.token)
            navigate('/login')
            props.showAlert("Account Created Successfully","success")
          }else{
            props.showAlert("Invalid Credentials","danger")
          }
  }
  return (
    <div className="container my-3">
      <h2>Create Account</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={onchang}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            name="email"
            value={credentials.email}
            onChange={onchang}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            minLength={5}
            required
            onChange={onchang}
            name="password"
            value={credentials.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            minLength={5}
            onChange={onchang}
            name="cpassword"
            value={credentials.cpassword}
            required
          />
        </div>
        <button type="submit" onClick={handleclick} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
