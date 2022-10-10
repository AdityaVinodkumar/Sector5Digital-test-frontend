import { useEffect, useState } from 'react';
import ProjectService from "../services/ProjectService";
import { Project } from '../types/types';

export const useForm = () => {
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const projects = await ProjectService.getProjects();
    setProjects(projects);
  }
  
  return {projects};
};


