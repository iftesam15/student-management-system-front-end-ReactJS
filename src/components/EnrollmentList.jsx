import React, { useEffect, useState } from "react";
import { fetchEnrollments } from "../service/enrollmentService";
import DynamicTable from "./DynamicTable/DynamicTable";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const columns = [
    { header: "Course Name", accessor: "course_name" },
    { header: "Student Name", accessor: "student_full_name" },
    { header: "Enrollment Date", accessor: "enrollment_date" },
  ];

  useEffect(() => {
    const getEnrollments = async () => {
      try {
        const res = await fetchEnrollments();

        const formattedData = res.data.map((enrollment) => ({
          ...enrollment,
          enrollment_date: format(
            new Date(enrollment.enrollment_date),
            "MM/dd/yyyy"
          ),
        }));

        setEnrollments(formattedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getEnrollments();
  }, []);

  return (
    <div>
      <h1>Enrollments</h1>
      {/* <table className="table-container">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.enrollment_id}>
              <td>{enrollment.course_name}</td>
              <td>{enrollment.student_full_name}</td>
              <td>{formatDate(enrollment.enrollment_date)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Link to="/enrollments/new">New Enrollment</Link>
      <DynamicTable columns={columns} data={enrollments} showActions={false} />
    </div>
  );
};

export default EnrollmentList;
