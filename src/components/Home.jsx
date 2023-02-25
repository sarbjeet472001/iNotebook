import React from 'react'
import Inputs from './Inputs'
import Note from './Note'

const Home = (props) => {
  return (
    <>
    <div className='container'>
      <Note showAlert={props.showAlert}/>
      </div>
    </>
  )
}

export default Home
