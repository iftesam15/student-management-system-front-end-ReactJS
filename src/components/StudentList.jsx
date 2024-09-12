import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { getAll, remove } from "../API Service/services";
import { format } from "date-fns";
import DynamicTable from "./DynamicTable/DynamicTable";
import { Link } from "react-router-dom";
const StudentList = () => {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Date of Birth", accessor: "date_of_birth" },
  ];

  const [students, setStudents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 6000,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await getAll("/students"); // Use dynamic getAll function
        const formattedStudents = res.data.map((student) => ({
          student_id: student.student_id,
          name:
            student.firstName || student.lastName
              ? `${student.firstName} ${student.lastName}`
              : "--", // Combine first and last name
          date_of_birth: format(new Date(student.date_of_birth), "MM/dd/yyyy"),
          email: student.email ? student.email : "--",
        }));

        setStudents(formattedStudents);
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

  const handleEdit = (student) => {
    // Navigate to edit page with student ID
    navigate(`/students/edit/${student.student_id}`);
  };

  const handleDelete = async (student) => {
    try {
      const res = await remove("/students", student.student_id);
      console.log(res.status);

      const data = res;

      if (res.status === "success") {
        const updatedStudents = students.filter(
          (s) => s.student_id !== student.student_id
        );
        setStudents(updatedStudents);
        setSnackbar({
          open: true,
          message: data.message,
          severity: "success",
          autoHideDuration: 3000,
        });
      } else if (res.status === "fail") {
        setSnackbar({
          open: true,
          message: data.message,
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
    <div className="">
      <h1>Students</h1>
      <Link to="/students/new">Add Student</Link>

      <DynamicTable
        columns={columns}
        data={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
      />
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
