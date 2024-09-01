import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../environments/environment";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NewEnrollment() {
  const BASE_URL = environment.BASE_URL;
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}courses/names`);
        const data = await response.json();
        setCourses(data.data);
      } catch (err) {
        console.log("Error fetching courses:", err);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await fetch(`${BASE_URL}students`);
        const data = await response.json();
        setStudents(data.data);
      } catch (err) {
        console.log("Error fetching students:", err);
      }
    };

    fetchCourses();
    fetchStudents();
  }, [BASE_URL]);

  useEffect(() => {
    if (selectedCourseId) {
      const fetchInstructorsByCourse = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}instructors/${selectedCourseId}`
          );
          const data = await response.json();
          if (Array.isArray(data.data)) {
            setInstructors(data.data); // Set instructors if it's an array
          } else if (data.data) {
            setInstructors([data.data]); // If it's a single object, wrap it in an array
          } else {
            setInstructors([]); // Fallback to an empty array if no data
          }
          console.log("instructors", data.data);
        } catch (err) {
          console.log("Error fetching instructors by course:", err);
          setInstructors([]); // Ensure instructors is always an array
        }
      };

      fetchInstructorsByCourse();
    } else {
      setInstructors([]);
    }
  }, [selectedCourseId, BASE_URL]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
    setSelectedInstructorId(""); // Reset instructor selection when course changes
  };

  const handleStudentChange = (e) => {
    setSelectedStudentId(e.target.value);
  };

  const handleInstructorChange = (e) => {
    setSelectedInstructorId(e.target.value);
  };

  const handleDateChange = (e) => {
    setEnrollmentDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}enrollments`, {
        course_id: selectedCourseId,
        student_id: selectedStudentId,
        enrollment_date: enrollmentDate,
        instructor_id: selectedInstructorId,
      });
      console.log("Enrollment created:", response.data);
      navigate("/enrollments"); // Navigate to enrollment list or another page after success
    } catch (error) {
      console.log("Error creating enrollment:", error);
    }
  };

  return (
    <div className="">
      <h2>New Enrollment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course:
          </label>
          <select
            id="course"
            className="form-select"
            value={selectedCourseId}
            onChange={handleCourseChange}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="instructor" className="form-label">
            Instructor:
          </label>
          <select
            id="instructor"
            className="form-select"
            value={selectedInstructorId}
            onChange={handleInstructorChange}
            disabled={!selectedCourseId} // Disable dropdown if no course is selected
          >
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option
                key={instructor.instructor_id}
                value={instructor.instructor_id}
              >
                {instructor.first_name} {instructor.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="student" className="form-label">
            Student:
          </label>
          <select
            id="student"
            className="form-select"
            value={selectedStudentId}
            onChange={handleStudentChange}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="enrollmentDate" className="form-label">
            Enrollment Date:
          </label>
          <input
            type="date"
            id="enrollmentDate"
            className="form-control"
            value={enrollmentDate}
            onChange={handleDateChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
