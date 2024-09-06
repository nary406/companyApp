import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaUserFriends, FaUserCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useState } from "react";
import Cookies from 'js-cookie';
import './index.css';

const Header = () => {
    const person = localStorage.getItem("name");
    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

    const removeAccess = () => {
        Cookies.remove('jwtToken');
        console.log("removed");
        navigate('/login');
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
    }

    return (
        <div className="main-header-container">
            <Link to="/" className="logo">
                <FaUserCircle className="logo-icon" />
                <h3>DashBoard</h3>
            </Link>
            <div className="lg-container">
                <ul className="lg-list">
                    <li className="header-item">
                        <Link to="/" className="link">
                            <FaHome className="link-icon" />
                            Home
                        </Link>
                    </li>
                    <li className="header-item">
                        <Link to="/newemployee" className="link">
                            <FaUserPlus className="link-icon" />
                            Create Employee
                        </Link>
                    </li>
                    <li className="header-item">
                        <Link to="/employeelist" className="link">
                            <FaUserFriends className="link-icon" />
                            Employee List
                        </Link>
                    </li>
                </ul>
                <div className="user-info">
                    <FaUserCircle className="profile-icon" />
                    <h3>{person}</h3>
                    <button className="header-logout-button" onClick={removeAccess}>
                        <FaSignOutAlt className="logout-icon" />
                        Logout
                    </button>
                </div>
            </div>
            <div className="hamburger-icon" onClick={toggleMobileMenu}>
                <FaBars className="hamburger" />
            </div>
            {isMobileMenuOpen && (
                <ul className="sm-container">
                    <li className="sm-list-item">
                    <Link to="/" className="link">
                            <FaHome className="link-icon" />
                            Home
                        </Link>
                    </li>
                    <li className="sm-list-item">
                    <Link to="/newemployee" className="link">
                            <FaUserPlus className="link-icon" />
                            Create Employee
                        </Link>
                    </li>
                    <li className="sm-list-item">
                    <Link to="/employeelist" className="link">
                            <FaUserFriends className="link-icon" />
                            Employee List
                        </Link>
                    </li>
                    <li className="sm-list-item" >
                    <button className="header-logout-button" onClick={removeAccess}>
                        <FaSignOutAlt className="logout-icon" />
                        Logout
                    </button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Header;