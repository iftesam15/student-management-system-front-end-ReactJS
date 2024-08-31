// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Students from "./pages/Students";
// import EditStudent from "./pages/EditStudent";
// import Header from "./components/Header";
// import "./index.css";
// import Enrollment from "./pages/Enrollment";
// import Instructors from "./pages/Instructors";
// import "react-bootstrap";
// import InstructorForm from "./components/InstructorForm";
// import About from "./components/About";
// import Help from "./components/Help";
// import Contact from "./components/Contact";
// const App = () => (
//   <div className="app-container">
//     <Header />
//     <div className="container">
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/students" element={<Students />} />
//           <Route path="/students/new" element={<EditStudent />} />
//           <Route path="/students/edit/:id" element={<EditStudent />} />
//           <Route path="/enrollments" element={<Enrollment />} />
//           <Route path="/instructors" element={<Instructors />} />
//           <Route path="/instructors/new" element={<InstructorForm />} />
//           <Route path="/instructors/edit/:id" element={<InstructorForm />} />
//           <Route path="/about" element={<About />}>
//             <Route index element={<Navigate to="help" replace />} />
//             <Route path="help" element={<Help />} />
//             <Route path="contact" element={<Contact />} />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   </div>
// );

// export default App;
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
              <Route path="/instructors" element={<Instuctors></Instuctors>} />

              <Route path="/about" element={<About></About>} />
              <Route path="/courses" element={<Courses></Courses>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
