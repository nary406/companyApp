
import "./index.css"
import Cookies from "js-cookie"
import React, { useState } from 'react';
import { useNavigate, Navigate, } from "react-router-dom";

const Login = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showerror, setshowError] = useState(false);

  let history=useNavigate()

  const success=(jwtToken)=>{
  
    Cookies.set("jwtToken", jwtToken, {expires:30})
   
   history("/")
  
  
   

  }


  const onSubmitForm = async event => {
    localStorage.setItem("name",name)
    event.preventDefault()
    
    const userDetails = {name, password}
    const apiUrl = "https://employeedetails-4ur0.onrender.com/login"
    const options = {
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(userDetails),
    }
    
    const response = await fetch(apiUrl, options)
    const data = await response.json()
 
    if (response.ok === true) {
    success(data.jwtToken)
    } else {
        setshowError(true)
        setError(data.error)
     
     console.log(data.error)
    
    }
  }
  
const jwtToken=Cookies.get("jwtToken")


 if(jwtToken!==undefined){
return <Navigate to ="/" />
 }else{
  return <div  className="container"> 
  <form  onSubmit={onSubmitForm} className="form_div">
  <h2 className="title">Login</h2>
    <label className="label">
      Username: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      
   
    <label  className="label">
      Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      /><br/>
  {showerror&& <p style={{color:"red"}}>*{error}</p>}
    <button type="button" onClick={onSubmitForm}  className="button">
      Login
    </button>
   
  </form>
</div>
 }
};



export default Login;