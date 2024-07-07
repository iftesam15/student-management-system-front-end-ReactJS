import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    if (id) {
      fetch(`http://localhost:3000/students/${id}`)
        .then((response) => response.json())
        .then((data) => setStudent(data.data))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!student.email || !emailPattern.test(student.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const url = id
      ? `http://localhost:3000/students/${id}`
      : "http://localhost:3000/students";
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/students");
      })
      .catch((error) => console.error("Error:", error));
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
