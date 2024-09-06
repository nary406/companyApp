import Header from "../Header";
import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import { v4 as uuid } from "uuid";
import { FaUserPlus } from 'react-icons/fa'; 
import { ThreeDots } from 'react-loader-spinner'; // Import the loader

const NewEmp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileno: '',
    role: 'HR',
    gender: 'male',
    date: "",
    degree: 'mca',
    image: null
  });

  const [upload, setUpload] = useState("Upload");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      Id: uuid(),
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todaysDate = new Date().toLocaleDateString();
    const newForm = { ...formData, date: todaysDate };

    if (upload === "Upload") {
      alert("Please upload an image.");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newForm)
    };

    const myResponse = await fetch("https://employeedetails-4ur0.onrender.com/newemp", options);
    const myDetails = await myResponse.json();
    if (myResponse.ok) {
      alert("New employee created successfully.");
    } else {
      setError(myDetails.message);
    }
  };

  const uploadImage = async () => {
    if (formData.image && formData.image instanceof File) {
      setIsLoading(true); // Start loading
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

      setUpload("Uploaded");
      setIsLoading(false); // Stop loading
    } else {
      console.log("No image to upload or image already uploaded.");
    }
  };

  const onBlurChange = (e) => {
    if (e.target.value === "") {
      setError(`${e.target.name} should not be empty.`);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <div className="card">
         <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
         <FaUserPlus style={{marginRight:"10px", fontSize:"35px"}}/>
         <h1>New Employee</h1>
         </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={onBlurChange}
                  className="input"
                />
              </label>
            </div>
            <div className="formGroup">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={onBlurChange}
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
                  value={formData.mobileno}
                  onChange={handleChange}
                  onBlur={onBlurChange}
                  className="input"
                />
              </label>
            </div>
            <div className="formGroup">
              <label>
                Role
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
            <div className="formGroupradio">
              <h3 style={{marginLeft:"0px", margin:"5px"}}>
                Gender
              </h3>
             <div style={{marginTop:"10px"}}>
             <label>
                <input
                id="gender"
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
            </div>
            <div className="formGroupradio"  style={{marginTop:"0px", marginBottom:"5px"}}>
              <h3  style={{marginTop:"10px", marginBottom:"5px"}}>
                Degree
              </h3>
             <div style={{ marginBottom:"10px"}}> 
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
            </div>
            <div className="formGroupfile">
  <label htmlFor="image-upload" className="upload-label">
    <span className="upload-text">Upload Image</span>
    <span className="upload-icon">+</span>
  </label>
  <input
    type="file"
    id="image-upload"
    name="image"
    onChange={handleChange}
    className="fileInput"
  />
  <button type="button" onClick={uploadImage} className="uploadButton">
    {isLoading ? (
      <ThreeDots height="20" width="20" color="#fff" />
    ) : (
      upload
    )}
  </button>
</div>
            <p className="error">{error}</p>
            <button type="submit" className="button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmp;