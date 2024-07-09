import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateInstructor, createInstructor, fetchInstructorById } from "../service/instructorService";

const InstructorForm = () => {
  const [instructor, setInstructor] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
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
        const payload = {
          first_name: instructor.first_name,
          last_name: instructor.last_name,
          email: instructor.email,
        }
        await updateInstructor(id, instructor);
      } else {
        await createInstructor(instructor);
      }
      navigate("/instructors");
    } catch (error) {
      console.error("Error:", error);
    }
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
    </div>
  );
};

export default InstructorForm;
