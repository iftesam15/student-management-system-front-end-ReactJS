import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudents, deleteStudent } from "../service/studentService";
import { Snackbar, Alert } from "@mui/material";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 6000,
  });

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetchStudents();
        // console.log(res);
        setStudents(res.data);
        // setSnackbar({
        //   open: true,
        //   message: "Students fetched successfully",
        //   severity: "success",
        //   autoHideDuration: 2000,
        // });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error fetching students",
          severity: "error",
          autoHideDuration: 6000,
        });
        console.error("Error:", error);
      }
    };

    getStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteStudent(id);
      const data =await res.json();
      
      if (res.status === 200) {
        const updatedStudents = students.filter(
          (student) => student.student_id !== id
        );
        setStudents(updatedStudents);
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
          autoHideDuration: 3000,
        });
      } else if (res.status === 404) {
        setSnackbar({
          open: true,
          message: "Student not found",
          severity: "warning",
          autoHideDuration: 3000,
        });
      } else {
        setSnackbar({
          open: true,
          message: "Error deleting student",
          severity: "error",
          autoHideDuration: 6000,
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
        autoHideDuration: 6000,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <h1>Students</h1>
      <Link to="/students/new">Add Student</Link>
      <ul>
        {students.map((student) => (
          <li key={student.student_id}>
            {student.first_name} {student.last_name}
            <Link to={`/students/edit/${student.student_id}`}>Edit</Link>
            <button onClick={() => handleDelete(student.student_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StudentList;
