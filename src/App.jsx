import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard"; // Optional, replace with your protected route component
import Layout from "./components/Layout";
import PrivateRoute from "./utils/PrivateRoute";
import StudentList from "./components/StudentList";
import About from "./components/About";
import EditStudent from "./pages/EditStudent";
import StudentForm from "./components/StudentForm";
import Enrollment from "./pages/Enrollment";
import Instuctors from "./pages/Instructors";
import Courses from "./pages/Courses";
import Logout from "./pages/Logout";
import NewEnrollment from "./components/NewEnrollment";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import HeadDepartmentList from "./components/HeadDepartmentList";
import EditHeadDepartments from "./pages/EditHeadDepartments";
const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentList></StudentList>} />
              <Route
                path="/students/edit/:id"
                element={<EditStudent></EditStudent>}
              />
              <Route
                path="/students/new"
                element={<StudentForm></StudentForm>}
              />
              <Route path="/enrollments" element={<Enrollment></Enrollment>} />
              <Route
                path="/enrollments/new"
                element={<NewEnrollment></NewEnrollment>}
              />
              <Route path="/instructors" element={<Instuctors></Instuctors>} />

              <Route path="/about" element={<About></About>} />
              <Route path="/courses" element={<Courses></Courses>} />
              <Route
                path="/head_department"
                element={<HeadDepartmentList></HeadDepartmentList>}
              />
              <Route
                path="/head_department/new"
                element={<EditHeadDepartments></EditHeadDepartments>}
              ></Route>
              <Route
                path="/head_department/:id"
                element={<EditHeadDepartments></EditHeadDepartments>}
              ></Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/forget-password"
              element={<ForgetPassword></ForgetPassword>}
            />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
