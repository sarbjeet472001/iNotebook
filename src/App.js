import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import {Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
      <Route path='/' element={<Home showAlert={showAlert}/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login showAlert={showAlert}/>}/>
      <Route path='/signup' element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </>
  );
}

export default App;
