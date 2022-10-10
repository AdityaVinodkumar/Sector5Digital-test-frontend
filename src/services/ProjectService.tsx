import axios from "axios";
import { Project } from "../types/types";


export const BASE_URL = 'http://localhost:4000';

const ProjectService = {
  
  getProjects: async () => {
    let response = await axios.get(`${BASE_URL}/projects`);
    return response.data;
  },
 
  getProjectByName: async (name: any) => {
    let response = await axios.get(`${BASE_URL}/projects/${name}`);
    return response.data;
  },

  createProject: async ( data: Project) => {
    const temp = {
      name: data.name,
      expectedHours: data.expectedHours
    }
    let response = await axios.post(`${BASE_URL}/projects`, temp);
    return response.data;
  },

  updateProject: async ( data: Project) => {
    let response = await axios.patch(`${BASE_URL}/projects/${data._id}`, data);
    return response.data;
  },

  deleteProject: async ( id: string) => {
    let response = await axios.delete(`${BASE_URL}/projects/${id}`);
    return response.data;
  },
  
};

export default ProjectService;
