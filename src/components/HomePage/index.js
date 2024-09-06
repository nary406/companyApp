import React from 'react';
import { FaUsers, FaBuilding, FaRegClock } from 'react-icons/fa'; // Importing icons
import './index.css';
import Header from "../Header";


const Home = () => {
    return (
        <div>
            <Header />
            <h1 className="dashboard-header">Welcome to Admin Panel</h1>
            <div className="dashboard-container">
               
                
               
           <div className="wid_div">
           <img src="https://res.cloudinary.com/dky72aehn/image/upload/v1683277209/samples/cloudinary-group.jpg" alt="Company Overview" className="company-image" /> {/* Displaying the image */}
                
              

                <div className="dashboard-widgets">
                    <div className="dashboard-widget widget-total-employees">
                        <FaUsers className="widget-icon" />
                        <h2>Total Employees</h2>
                        <p>150</p> {/* Dynamic data */}
                    </div>
                    <div className="dashboard-widget widget-departments">
                        <FaBuilding className="widget-icon" />
                        <h2>Departments</h2>
                        <p>5</p> {/* Dynamic data */}
                    </div>
                    <div className="dashboard-widget widget-recent-hires">
                        <FaRegClock className="widget-icon" />
                        <h2>Recent Hires</h2>
                        <ul>
                            <li>John Doe</li>
                            <li>Jane Smith</li>
                            <li>Bob Johnson</li>
                        </ul>
                    </div>
                </div>
              
           </div>
           <div className="company-description">
                <h2>About Our Company</h2>
                        <p>We are a leading company in the industry, dedicated to providing top-notch services and products to our clients. Our mission is to innovate and excel in every aspect of our business.</p>
                        
        
                </div>
               
            </div>
           </div>
    )
}

export default Home;