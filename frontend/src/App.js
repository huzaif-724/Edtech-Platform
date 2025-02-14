import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import AllCourses from "./pages/AllCourse";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/instructor/MyCourses";
import AddCourse from "./pages/instructor/AddCourse";

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
          <Route path="/allCourses" element={<AllCourses/>}/>
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />

        </Routes>
        
       </div>
        
     

    
        


  </>
  );
}

export default App;
