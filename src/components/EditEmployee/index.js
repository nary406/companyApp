
import {useState} from "react"
import {v4 as uuid} from "uuid"

const EditEmp = (props) => {
    const {info, allList, onChangeView}=props
    const listItem=allList.find((item)=>item.Id===info)
   

    const [newformData, setnewFormData] = useState(listItem);
   

  
    const [upload, setupload]=useState("upload")
    const [error, seterror]=useState("")
  
   
  
    const handleChange = (e) => {
      
      const { name, value, type, checked, files } = e.target;
  
      setnewFormData((prevData) => ({
        ...prevData, Id: uuid(),
        [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
      }));
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
    const todaysDate=new Date().toLocaleDateString()
    const newForm={...newformData, date:todaysDate}
     
   
    
  
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newForm)
      };
  
      const myresponse = await fetch(`https://employeedetails-4ur0.onrender.com/user/${listItem.Id}`, options);
      const mydetails = await myresponse.json();
      if (myresponse.ok){
        alert("newEmployee updated")
        onChangeView()
    }else{
      
    }
     
    };
  
    const uploadImage = async() => {
      if (newformData.image && newformData.image instanceof File) {
        const data = new FormData();
        data.append("file", newformData.image);
        data.append("upload_preset", "nary_store");
        data.append("cloud_name", "dky72aehn");
  
        const options = {
          method: "POST",
          body: data
        };
  
        const response = await fetch("https://api.cloudinary.com/v1_1/dky72aehn/image/upload", options);
        const details = await response.json();
  
        setnewFormData((prevState) => ({
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
                value={newformData.name}
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
                value={newformData.email}
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
                value={newformData.mobileno}
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
                value={newformData.role}
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
                checked={newformData.gender === 'male'}
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
                checked={newformData.gender === 'female'}
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
                checked={newformData.degree === 'mca'}
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
                checked={newformData.degree === 'bca'}
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
                checked={newformData.degree === 'bsc'}
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
                file={newformData.image}
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
       
       {InputsFunc()}
      </div>
    );
  }; 

export default EditEmp