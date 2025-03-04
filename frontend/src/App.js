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
import CreateSection from "./pages/instructor/CreateSection";
import PublishCourse from "./pages/instructor/PublishCourse";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import CourseContent from "./pages/student/CourseContent";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import Setting from "./pages/Setting";
import PurchaseHistory from "./pages/student/PurchaseHistory";



function App() {
  return (
    <>
       <div className=" bg-richblack-900">

        <Navbar/>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/allCourses" element={<AllCourses/>}/>
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/dashboard/my-courses" element={<MyCourses />} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/add-section" element={<CreateSection/>} />
          <Route path="/dashboard/publish-course" element={<PublishCourse/>} />

          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
          <Route path="/dashboard/course-content/:courseId" element={<CourseContent/>} />
          <Route path="/dashboard/my-profile" element={<Profile/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/dashboard/settings" element={<Setting/>} />
          <Route path="/dashboard/puchase-history" element={<PurchaseHistory/>} />

        </Routes>
        
       </div>
        
     

    
        


  </>
  );
}

export default App;
