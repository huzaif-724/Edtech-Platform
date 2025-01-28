import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <>
       <div className=" bg-richblack-900">

        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
        </Routes>
        
       </div>
        
     

    
        


  </>
  );
}

export default App;
