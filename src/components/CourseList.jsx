import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../service/courseService";
import DynamicTable from "./DynamicTable/DynamicTable";

export default function CourseList() {
  const columns = [
    { header: "Course Name", accessor: "course_name" },
    { header: "Course Description", accessor: "course_description" },
    { header: "Credits", accessor: "credits" },
  ];

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetchCourses();
        setCourses(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCourses();
  }, []);
  return (
    <div>
      <h1>Course List</h1>
      <DynamicTable columns={columns} data={courses}></DynamicTable>
    </div>
  );
}
