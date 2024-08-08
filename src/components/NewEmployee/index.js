import Header from "../Header";
import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import {v4 as uuid} from "uuid"



const NewEmp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileno: '',
    role: 'HR',
    gender: 'male',
    date:"",
    degree: 'mca',
    image: null
  });

  const [upload, setupload]=useState("upload")
  const [error, seterror]=useState("")

 

  const handleChange = (e) => {
    
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData, Id: uuid(),
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  const todaysDate=new Date().toLocaleDateString()
  const newForm={...formData, date:todaysDate}
   
 
  if(upload==="upload"){
    alert ("upload image")
    return 
  }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newForm)
    };

    const myresponse = await fetch("https://employeedetails-4ur0.onrender.com/newemp", options);
    const mydetails = await myresponse.json();
    if (myresponse.ok){
      alert("newEmployee Created")
  }else{
    seterror(mydetails.message)
  }
   
  };

  const uploadImage = async() => {
    if (formData.image && formData.image instanceof File) {
      const data = new FormData();
      data.append("file", formData.image);
      data.append("upload_preset", "nary_store");
      data.append("cloud_name", "dky72aehn");

      const options = {
        method: "POST",
        body: data
      };

      const response = await fetch("https://api.cloudinary.com/v1_1/dky72aehn/image/upload", options);
      const details = await response.json();

      setFormData((prevState) => ({
        ...prevState,
        image: details.url
      }));

      console.log("Image URL after upload:", details.url);
    } else {
      console.log("No image to upload or image already uploaded.");
    }
    
    setupload("uploaded");
  };

  const onBlurChange = (e) => {
    if(e.target.value === "") {
      seterror(`${e.target.name} should not be Empty`);
    }
  };


  const InputsFunc=()=>{
    return  <div style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <h1>New Employee</h1>
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>
            Name
            <input
              type="text"
              name="name"
              onBlur={onBlurChange}
              value={formData.name}
              onChange={handleChange}
              className="input"
            />
          </label>
        </div>
        <div className="formGroup">
          <label>
            Email
            <input
              type="text"
              name="email"
              onBlur={onBlurChange}
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </label>
        </div>
        <div className="formGroup">
          <label>
            Mobile No
            <input
              type="text"
              name="mobileno"
              onBlur={onBlurChange}
              value={formData.mobileno}
              onChange={handleChange}
              className="input"
            />
          </label>
        </div>
        <div className="formGroup">
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
        </div>
        <div className="formGroup">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="radio"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="radio"
            />
            Female
          </label>
        </div>
        <div className="formGroup">
          <label>
            <input
              type="radio"
              name="degree"
              value="mca"
              checked={formData.degree === 'mca'}
              onChange={handleChange}
              className="radio"
            />
            MCA
          </label>
          <label>
            <input
              type="radio"
              name="degree"
              value="bca"
              checked={formData.degree === 'bca'}
              onChange={handleChange}
              className="radio"
            />
            BCA
          </label>
          <label>
            <input
              type="radio"
              name="degree"
              value="bsc"
              checked={formData.degree === 'bsc'}
              onChange={handleChange}
              className="radio"
            />
            BSC
          </label>
        </div>
        <div className="formGroup">
          <label>
            Upload Image:
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="fileInput"
            />
          </label>
          <button type="button" onClick={uploadImage}>{upload}</button>
        </div>
        <p style={{color:"red"}}>{error}</p>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  </div>
  }

  return (
    <div>
      <Header />
     {InputsFunc()}
    </div>
  );
};

export default NewEmp;
