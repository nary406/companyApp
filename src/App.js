import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import Login from "./components/LoginPage"
import Home from "./components/HomePage"
import ProtectedRoute from "./components/protectedApp"
import NotFound from "./components/Notfound"
 import AllEmp from "./components/AllEmployees"
import NewEmp from "./components/NewEmployee"
// import EditEmp from "./components/EditEmployee"

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
    <Route exact path="/login" element={<Login/> } />
     <Route element={<ProtectedRoute/>}>
     <Route exact path="/" element={<Home/>} />
     <Route exact path="/newemployee" element={<NewEmp/>} />
     <Route exact path="/employeelist" element={<AllEmp/>} />
     </Route>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
