import axios from "axios";

const REST_API_BASE_URL = "https://springempapi.onrender.com/api/employees"

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployees = (employee) => axios.post(REST_API_BASE_URL, employee);

export const updateEmployees = (empId, updatedData) => axios.put(REST_API_BASE_URL + "/" + empId, updatedData);

export const employeeGetById = (empId) => axios.get(REST_API_BASE_URL + "/" +  empId);

export const deleteById = (empId) => axios.delete(REST_API_BASE_URL + "/" +  empId);