import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react"
import { CgProfile } from "react-icons/cg";
import Cookies from 'js-cookie'

import {MdHome, MdWork} from 'react-icons/md'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
   

    const person=localStorage.getItem("name")
    

    const navigate = useNavigate()

  const removeAccess = () => {
    Cookies.remove('jwtToken')
    
   console.log("removed")
    navigate('/login')
  }



  return (
    <div className="main-header-container">
      <Link to="/">
       <h1>DashBoard</h1>
      </Link>
      <div className="lg-container">
        <ul className="lg-list">
          <li className="header-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>

          <li className="header-item">
            <Link to="/newemployee" className="link">
              Create Employee
            </Link>
          </li>


          <li className="header-item">
            <Link to="/employeelist" className="link">
              Employeelist
            </Link>
          </li>
        </ul>
       
       <div  style={{color:"white", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"40%"}}>
      <div  style={{color:"white", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
        <CgProfile style={{fontSize:"30px"}}/>
      <h3 style={{color:"white", marginTop:"0px", marginBottom:"5px"}}>{person}</h3>
      </div>
       <button
          type="submit"
          className="header-logout-button"
          onClick={removeAccess}
        >
          Logout
        </button>
       </div>
      </div>
      <ul className="sm-container">
        <li className="sm-list-item">
          <Link to="/" className="l">
            <MdHome className="icons" />
          </Link>
        </li>
        <li className="sm-list-item">
          <Link to="/jobs" className="l">
            <MdWork className="icons" />
          </Link>
        </li>
        <li className="sm-list-item">
          <button
            type="button"
            data-testid="logout"
            alt="logout"
            className="button-icon"
            onClick={removeAccess}
          >
            <FiLogOut className="icons" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Header