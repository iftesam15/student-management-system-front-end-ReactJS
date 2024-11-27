import React, { useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../api";
import { environment } from "../environments/environment";
import studentReducer, {
  setStudent,
  updateStudentField,
  setError,
  clearError,
  initialState,
} from "./studentReducer";

const StudentForm = () => {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) {
        dispatch(setError("Error: No student ID provided."));
        return;
      }
      try {
        const response = await api.get(
          `${environment.APP_BASE_URL}/students/${id}`
        );
        dispatch(setStudent(response.data));
      } catch (error) {
        console.error("Error:", error);
        dispatch(setError("Error: Failed to fetch student data."));
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateStudentField(name, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!state.student.email || !emailPattern.test(state.student.email)) {
      dispatch(setError("Please enter a valid email address."));
      return;
    }

    const url = id ? `/students/${id}` : `/students`;
    const method = id ? "put" : "post";

    try {
      await api({
        method: method,
        url: url,
        data: state.student,
      });
      navigate("/students");
    } catch (error) {
      console.error("Error:", error);
      dispatch(setError("Error: Failed to save student."));
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Student</h1>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={state.student.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={state.student.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.student.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
