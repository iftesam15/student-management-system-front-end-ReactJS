import { getAll } from "../API Service/services";
import { environment } from "../environments/environment";
const BASE_URL = environment.BASE_URL;

export const fetchHeadDepartments = async () => {
    const response = await getAll("/head_department");
    return response;
}