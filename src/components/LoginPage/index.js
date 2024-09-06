
import "./index.css"
import Cookies from "js-cookie"
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, Navigate, } from "react-router-dom";

const Login = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showerror, setshowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let history=useNavigate()

  const success=(jwtToken)=>{
  
    Cookies.set("jwtToken", jwtToken, {expires:30})
   
   history("/")
  
  
   

  }


  const onSubmitForm = async event => {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true before submitting

    const userDetails = { name, password };
    const apiUrl = "https://employeedetails-4ur0.onrender.com/login";
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
      success(data.jwtToken);
    } else {
      setshowError(true);
      setError(data.error);
      console.log(data.error);
    }

    setIsLoading(false); // Set isLoading to false after submitting
  }
  
const jwtToken=Cookies.get("jwtToken")


 if(jwtToken!==undefined){
return <Navigate to ="/" />
 }else{
   return (
    <div className="container">
      <div className="form_card">
      <img src="https://res.cloudinary.com/dky72aehn/image/upload/v1725300268/16390_uhdvpa.jpg" alt="Login Illustration" />
        <form onSubmit={onSubmitForm} className="form_div">
          <h1 className="title">Login</h1>
          <div className="group">
            <span className="icon">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.25"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                ></path>
              </svg>
            </span>
            <input
              className="input"
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
  
          <div className="group">
            <svg
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          {showerror && <p style={{ color: "red" }}>*{error}</p>}
          <button type="button" onClick={onSubmitForm} className="button">
            {isLoading ? (
              <ThreeDots height="20" width="20" color="#fff" />
            ) : (
              'Login'
            )}
          </button>
        </form>
       
      </div>
     
    </div>
  );
  
 }
};



export default Login;