import React, { useEffect, useState } from "react";
import { fetchHeadDepartments } from "../service/headDepartmentService";
import DynamicTable from "./DynamicTable/DynamicTable";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { remove } from "../API Service/services";

export default function HeadDepartmentList() {
  const columns = [
    { header: "Head Department Name", accessor: "department_name" },
    { header: "Dean", accessor: "instructor_name" },
  ];

  const [headDepartments, setHeadDepartments] = useState([]);
  const navigate = useNavigate();

  const getHeadDepartments = async () => {
    try {
      const res = await fetchHeadDepartments();
      setHeadDepartments(res.data); // Update state with fetched data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getHeadDepartments();
  }, []);

  const handleEdit = (head_dept) => {
    console.log("head-dept is:", head_dept);

    // Navigate to edit page with head department ID
    navigate(`/head_department/${head_dept.head_department_id}`);
  };

  const handleDelete = async (head_dept) => {
    try {
      const res = await remove(
        "/head_department",
        head_dept.head_department_id
      );
      // Refresh the list after deletion
      getHeadDepartments();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Head Department List</h1>
      <Link to="/head_department/new">Add Head Department</Link>
      <DynamicTable
        columns={columns}
        data={headDepartments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
      />
    </div>
  );
}
