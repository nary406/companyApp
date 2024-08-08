import Cookies from "js-cookie" 
import { useNavigate,Route, Navigate,Outlet  } from "react-router-dom"

const ProtectedRoute=()=>{
    let navigate= useNavigate()
    const jwtToken=Cookies.get("jwtToken")
    if(jwtToken==undefined){
      
        return <Navigate to ="/login"/>

    }else{
    
        return <Outlet/>
    }

}

export default ProtectedRoute