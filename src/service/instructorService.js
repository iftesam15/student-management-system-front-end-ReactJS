import { environment } from "../environments/environment";

const BASE_URL = environment.BASE_URL;

export const fetchInstructors = async () => {
  const response = await fetch(`${BASE_URL}instructors`);
  const data = await response.json();
  return data;
};

export const fetchInstructorById = async (id) => {
  const response = await fetch(`${BASE_URL}instructors/${id}`);
  const data = await response.json();
  return data;
};

export const updateInstructor = async (id, instructor) => {
  const response = await fetch(`${BASE_URL}instructors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(instructor),
  });
  const data = await response.json();
  return data;
};

export const createInstructor = async (instructor) => {
  const response = await fetch(`${BASE_URL}instructors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(instructor),
  });
  const data = await response.json();
  return data;
};
export const deleteInstructor = async (id) => {
    const response = await fetch(`${BASE_URL}instructors/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };