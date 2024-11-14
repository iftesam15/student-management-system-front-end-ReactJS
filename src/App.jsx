import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard"; // Protected route
import Layout from "./components/Layout";
import PrivateRoute from "./utils/PrivateRoute";
import StudentList from "./components/StudentList";
import About from "./components/About";
import EditStudent from "./pages/EditStudent";
import StudentForm from "./components/StudentForm";
import Enrollment from "./pages/Enrollment";
import Instructors from "./pages/Instructors";
import Courses from "./pages/Courses";
import Logout from "./pages/Logout";
import NewEnrollment from "./components/NewEnrollment";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import HeadDepartmentList from "./components/HeadDepartmentList";
import EditHeadDepartments from "./pages/EditHeadDepartments";
import Not_Found from "./components/Not_Found";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Not_Found />} /> {/* Catch-all route */}
        {/* Protected Routes with Layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            {" "}
            {/* Layout only wraps protected routes */}
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/enrollments" element={<Enrollment />} />
            <Route path="/enrollments/new" element={<NewEnrollment />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/head_department" element={<HeadDepartmentList />} />
            <Route
              path="/head_department/new"
              element={<EditHeadDepartments />}
            />
            <Route
              path="/head_department/:id"
              element={<EditHeadDepartments />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
