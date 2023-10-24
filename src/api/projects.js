import axios from "axios";

const baseUrl = "http://localhost:8000/projects";


const getProjects = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const getProject = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const createProject = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const updateProjectConfig = async ({id, data}) => {
  try {
    const response = await axios.put(`${baseUrl}/config/${id}`, data);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const updateProjectNodes = async ({id, data}) => {
  try {
    const response = await axios.put(`${baseUrl}/nodes/${id}`, data);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default {
    getProject,
    getProjects,
    updateProjectConfig,
    updateProjectNodes,
    deleteProject,
    createProject
}