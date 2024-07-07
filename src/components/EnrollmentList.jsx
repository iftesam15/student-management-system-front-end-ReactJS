import React, { useEffect, useState } from "react";
import { fetchEnrollments } from "../service/enrollmentService";

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    const getEnrollments = async () => {
      try {
        const res = await fetchEnrollments();
        console.log("🚀 ~ getEnrollments ~ res:", res)
        
        setEnrollments(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getEnrollments();
  }, []);

  return (
    <div>
      <h1>Enrollments</h1>
      <table className="table-container">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.course_name}</td>
              <td>{enrollment.student_full_name}</td>
              <td>{formatDate(enrollment.enrollment_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentList;
