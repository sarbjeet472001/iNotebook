import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const navigate=useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""})
    const handleonclick=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const json=await response.json();
          console.log(json.token)
          if(json.success){
            localStorage.setItem('token',json.token)
            navigate('/')
            props.showAlert("Logged in Successfuly",'success')
          }else{
            props.showAlert("invalid credentials","danger")
          }
    }
    const ochange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='container mt-3'>
      <h2>Login to continue to iNotebook</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={ochange} value={credentials.email} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' onChange={ochange}  value={credentials.password} id="exampleInputPassword1" required/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleonclick}>Submit</button>
</form>
    </div>
  )
}

export default Login
