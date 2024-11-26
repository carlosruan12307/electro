// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./css/login.css"
function Login() {
  const [formData,setformData] = useState({
    matricula : "",
    password: ""
  })
  const [error,seterror] = useState('')
  const submitForm = async (e) => {
    e.preventDefault();
 
    const response = await window.electronAPI.login({ matricula: formData.matricula, password: formData.password });
    console.log(response.message)
    seterror(response.message);
  }
  return (
    <main>
      
            
            <form className='form' onSubmit={submitForm}>
            <h1>Login</h1>
    <input placeholder='matricula' onChange={(e) => setformData({...formData,matricula : e.target.value})}/>
    <input placeholder='senha' type='password' onChange={(e) => setformData({...formData,password : e.target.value})}/>
    <button type='submit'>submit</button>
    <div>{error}</div>
            </form>
           
    </main>
  );
}

export default Login;
