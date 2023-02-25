import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand text-light" to="/">iNotebook</Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""} text-light`} aria-current="page" to="/">Home</Link> 
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""} text-light`} to="/about">About</Link> 
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Log in</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>:<button className='btn btn-primary' onClick={logout}>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
