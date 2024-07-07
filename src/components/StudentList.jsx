import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudents, deleteStudent } from "../service/studentService"

const StudentList = () => {
  const [students, setStudents] = useState([]);
  // const apiUrl = process.env.B
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetchStudents();
        setStudents(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      const updatedStudents = students.filter(
        (student) => student.student_id !== id
      );
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error:", error);
    }
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
    </div>
  );
};

export default StudentList;
