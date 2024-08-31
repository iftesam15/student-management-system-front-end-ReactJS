import { environment } from "../environments/environment";

const BASE_URL = environment.BASE_URL;

export const fetchCourses = async () => {
    const response = await fetch(`${BASE_URL}courses`);
    const data = await response.json();
    return data;
}