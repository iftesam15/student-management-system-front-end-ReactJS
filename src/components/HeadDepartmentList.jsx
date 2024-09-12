import React, { useEffect, useState } from "react";
import { fetchHeadDepartments } from "../service/headDepartmentService";
import DynamicTable from "./DynamicTable/DynamicTable";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function HeadDepartmentList() {
  const columns = [
    { header: "Head Department Name", accessor: "department_name" },
    { header: "Dean", accessor: "instructor_name" },
  ];
  const [headDepartments, setHeadDepartments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getHeadDepartments = async () => {
      try {
        const res = await fetchHeadDepartments();
        setHeadDepartments(res.data); // Update state with fetched data
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getHeadDepartments();
  }, []);
  const handleEdit = (head_dept) => {
    console.log("head-dept is:", head_dept);

    // Navigate to edit page with student ID
    navigate(`/head_department/${head_dept.head_department_id}`);
  };
  return (
    <div>
      <h1>Head Department List</h1>
      <Link to="/head_department/new">Add Head Department</Link>
      <DynamicTable
        columns={columns}
        data={headDepartments}
        onEdit={handleEdit}
        showActions={true}
      />
    </div>
  );
}
