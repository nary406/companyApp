import React, { useState, useEffect } from 'react';
import Header from "../Header"
import { IoPerson } from "react-icons/io5";
import EditEmp from '../EditEmployee';



const AllEmp = () => {
    const [listdata, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [term, setTerm] = useState('');
    const [error, setError] = useState('');
    const [Edit, setEdit] = useState(false);

    const caseChange=(data)=>{

        const newData=data.map((item)=>({
            Id:item._id,
            name:item.name,
            email:item.email,
            mobileno:item.mobileno,
            role:item.role,
            gender:item.gender,
            degree:item.degree,
           date:item.date,
            image:item.image
        
        }))
       
        
        setData(newData)
        
            }


   

    useEffect(() => {
        // Simulate fetching data
        

             fetch("https://employeedetails-4ur0.onrender.com/userdetails").
             then(res=>{
                return res.json();

                }).then(data=>{
                    caseChange(data)

                }).catch(err=>{
                console.log(err)
                })
           
           
        

       
    }, [Edit]);
    

    const changePage=(e)=>{
        setEdit(!Edit) 
        setTerm(e.target.id)
    }

    
    const onChangeView=(e)=>{
        setEdit(!Edit) 
       
    }


    useEffect(() => {
      
        setFilteredData(
            listdata.filter(item =>
               item.name.includes(searchTerm)||item.mobileno.includes(searchTerm)||item.email.includes(searchTerm)
            )
        );
    }, [searchTerm, listdata]);


   
    const onClickDelete=async(e)=>{
        console.log(e.target.id)

        const response=await fetch(`https://employeedetails-4ur0.onrender.com/deleteuser/${e.target.id}`, {method:"DELETE"})
        const finaldata=await response.json()
        if (response.ok) {
            setData(listdata.filter(item => item.Id !== e.target.id));
        } else {
            setError(finaldata.message);
        }
        console.log(finaldata.message)

    }



    const allEmployees=()=>{

        return <div>
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Image
                        </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Course</th>
                    <th>Create Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index}>
                         <td>{index+1}</td>
                        <td><div>
                            {item.image==="null"?<IoPerson/>:<img src={item.image} style={{width:"40px",height:"40px", borderRadius:"100px"}}/>}</div></td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobileno}</td>
                        <td>{item.role}</td>
                        <td>{item.gender}</td>
                        <td>{item.degree}</td>
                        <td>{item.date}</td>
                        
                       <td> <button id={item.Id} onClick={changePage}>Edit</button>
                       <button id={item.Id} style={{marginLeft:"20px"}} onClick={onClickDelete}>delete</button></td>
                       
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    }
    return (
        <div>
            <Header/>
            {Edit?<EditEmp info={term} allList={filteredData} onChangeView={onChangeView}/>:allEmployees()}
        </div>
    );
};

export default AllEmp;
