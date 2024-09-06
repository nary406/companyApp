import React, { useState, useEffect } from 'react';
import Header from "../Header";
import { IoPerson } from "react-icons/io5";
import EditEmp from '../EditEmployee';
import { ThreeDots } from 'react-loader-spinner';
import "./index.css";

const AllEmp = () => {
    const [listdata, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [term, setTerm] = useState('');
    const [error, setError] = useState('');
    const [Edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const caseChange = (data) => {
        const newData = data.map((item) => ({
            Id: item._id,
            name: item.name,
            email: item.email,
            mobileno: item.mobileno,
            role: item.role,
            gender: item.gender,
            degree: item.degree,
            date: item.date,
            image: item.image
        }));
        setData(newData);
        setIsLoading(false); // Set loading state to false after data is fetched
    }

    useEffect(() => {
        fetch("https://employeedetails-4ur0.onrender.com/userdetails")
            .then(res => res.json())
            .then(data => {
                caseChange(data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Set loading state to false in case of error
            });
    }, [Edit]);

    const changePage = (e) => {
        setEdit(!Edit);
        setTerm(e.target.id);
    }

    const onChangeView = () => {
        setEdit(!Edit);
    }

    useEffect(() => {
        setFilteredData(
            listdata.filter(item =>
                item.name.includes(searchTerm) || item.mobileno.includes(searchTerm) || item.email.includes(searchTerm)
            )
        );
    }, [searchTerm, listdata]);

    const onClickDelete = async (e) => {
        const response = await fetch(`https://employeedetails-4ur0.onrender.com/deleteuser/${e.target.id}`, { method: "DELETE" });
        const finaldata = await response.json();
        if (response.ok) {
            setData(listdata.filter(item => item.Id !== e.target.id));
        } else {
            setError(finaldata.message);
        }
    }

    const allEmployees = () => {
        return (
            <div className="table-container">
                {isLoading ? (
                    <div className="loader-container" style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <ThreeDots height="60" width="60" color="blue" />
                    </div>
                ) : (
                    <>
                        <div className="groupsearch">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="iconsearch">
                                <g>
                                    <path
                                        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                    ></path>
                                </g>
                            </svg>
                            <input className="inputsearch" type="search" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>

                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
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
                                        <td data-label="ID">{index + 1}</td>
                                        <td data-label="Image">
                                            <div>
                                                {item.image === "null" ? <IoPerson /> : <img src={item.image} alt={item.name} className="profile-image" />}
                                            </div>
                                        </td>
                                        <td data-label="Name">{item.name}</td>
                                        <td data-label="Email">{item.email}</td>
                                        <td data-label="Mobile No">{item.mobileno}</td>
                                        <td data-label="Designation">{item.role}</td>
                                        <td data-label="Gender">{item.gender}</td>
                                        <td data-label="Course">{item.degree}</td>
                                        <td data-label="Create Date">{item.date}</td>
                                        <td data-label="Action">
                                            <button id={item.Id} onClick={changePage}>Edit</button>
                                            <button id={item.Id} className="delete-button" onClick={onClickDelete}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        );
    }

    return (
        <div>
            <Header />
            {Edit ? <EditEmp info={term} allList={filteredData} onChangeView={onChangeView} /> : allEmployees()}
        </div>
    );
};

export default AllEmp;