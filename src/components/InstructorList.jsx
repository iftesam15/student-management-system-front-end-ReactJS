import React, { useEffect, useState } from "react";
import {
  fetchInstructors,
  deleteInstructor,
} from "../service/instructorService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function InstructorList() {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getInstructors = async () => {
      try {
        const res = await fetchInstructors();
        setInstructors(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getInstructors();
  }, []);

  const onEdit = (id) => {
    navigate(`/instructors/edit/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      await deleteInstructor(id);
      const updatedInstructors = instructors.filter(
        (instructor) => instructor.instructor_id !== id
      );
      setInstructors(updatedInstructors);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Instructor list</h1>
      <Link to="/instructors/new">Add Instructor</Link>
      <table className="table-container">
        <thead>
          <tr>
            <th>Instructor Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.instructor_id}>
              <td>{instructor.first_name + " " + instructor.last_name}</td>
              <td>{instructor.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => onEdit(instructor.instructor_id)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(instructor.instructor_id)}
                >
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
