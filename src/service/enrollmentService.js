import { environment } from "../environments/environment";

const BASE_URL = environment.BASE_URL;

export const fetchEnrollments = async () =>{
    const response = await fetch(`${BASE_URL}enrollments`);
    const data =await response.json();
    return  data;
}