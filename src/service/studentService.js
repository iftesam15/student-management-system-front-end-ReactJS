// studentService.js
const BASE_URL = "http://localhost:3000/students";

export const fetchStudents = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const deleteStudent = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
