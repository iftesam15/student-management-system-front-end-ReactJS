import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { updateInstructor, createInstructor, fetchInstructorById } from "../service/instructorService";

const InstructorForm = () => {
  const [instructor, setInstructor] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // or "error" for error messages
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getInstructorById = async (id) => {
        try {
          const res = await fetchInstructorById(id);
          setInstructor(res.data); // Update state with fetched data
        } catch (error) {
          console.error("Error:", error);
        }
      };
      getInstructorById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (id) {
        await updateInstructor(id, instructor);
      } else {
        await createInstructor(instructor);
      }
      
      // Update Snackbar state for success
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage(`${id ? 'Instructor updated' : 'Instructor added'} successfully`);
  
      // Wait a bit before navigating, so Snackbar can be displayed
      setTimeout(() => {
        navigate("/instructors");
      }, 2000); // Adjust delay time as needed
    } catch (error) {
      console.error("Error:", error);
      
      // Update Snackbar state for error
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(`Error: ${error.message}`);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Instructor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={instructor.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={instructor.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={instructor.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default InstructorForm;
