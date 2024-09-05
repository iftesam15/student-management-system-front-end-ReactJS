import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../api";
import { environment } from "../environments/environment";
const StudentForm = () => {
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const editStudent = async (id) => {
      if (!id) {
        setError("Error: No student ID provided.");
        return;
      }
      try {
        const response = await api.get(
          `${environment.APP_BASE_URL}/students/${id}`,
          student
        );
        setStudent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error: Failed to update student.");
      }
    };

    editStudent(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!student.email || !emailPattern.test(student.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const url = id
      ? `/students/${id}` // Since `baseURL` is already set in the axios instance
      : `/student`;
    const method = id ? "put" : "post"; // Axios uses lowercase method names

    try {
      await api({
        method: method,
        url: url,
        data: student,
      });
      navigate("/students");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Student</h1>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={student.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={student.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
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
