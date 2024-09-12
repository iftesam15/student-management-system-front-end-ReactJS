import React, { useEffect, useState } from "react";
import { environment } from "../environments/environment";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { fetchInstructors } from "../service/instructorService";

export default function EditHeadDepartments() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [head_department, setHeadDepartment] = useState({
    department_name: "",
    head_instructor_id: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const editHeadDepartments = async (id) => {
      if (!id) {
        setError("Error: No department ID provided.");
        return;
      }
      try {
        const response = await api.get(
          `${environment.BASE_URL}head_department/${id}`
        );
        const departmentData = response.data;
        console.log(
          "🚀 ~ editHeadDepartments ~ departmentData:",
          departmentData
        );
        setHeadDepartment(departmentData);
        setSelectedInstructorId(departmentData.instructor_id); // Use instructor_id for pre-selection
      } catch (error) {
        console.error("Error:", error);
        navigate("/head_department");
      }
    };
    editHeadDepartments(id);
  }, [id, navigate]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeadDepartment((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInstructorChange = (e) => {
    const selectedId = e.target.value;
    setSelectedInstructorId(selectedId); // Update state asynchronously
    setHeadDepartment((prevState) => ({
      ...prevState,
      head_instructor_id: selectedId, // Update head_instructor_id in state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!head_department.department_name) {
      setError("Please provide a department name.");
      return;
    }
    try {
      const url = id ? `/head_department/${id}` : "/head_department";
      const method = id ? "PUT" : "POST";
      await api({
        method: method,
        url: url,
        data: head_department,
      });
      navigate("/head_department");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Head of Department</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department Name</label>
          <input
            type="text"
            name="department_name"
            className="form-control"
            value={head_department.department_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dean</label>
          <select
            id="instructor"
            className="form-select"
            value={selectedInstructorId}
            onChange={handleInstructorChange}
            required
          >
            <option value="">Select Dean</option>
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
        <button className="btn btn-primary" type="submit">
          {id ? "Update" : "Save"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
