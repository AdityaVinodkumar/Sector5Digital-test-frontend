import React, { useState } from 'react';
import { Project } from '../types/types';
import ProjectService from "../services/ProjectService";

export const AddProjectForm = () => {
  
  const initialValue: Project = {
    _id: '',
    name: '',
    expectedHours: 0,
    isCompleted: false,
    workedHours: 0,
    remainedHours: 0,
    completedPercent: 0,
  };

  const [project, setProject] = useState<Project>(initialValue);

  const handleChange = e => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onCreate = async(e) => {
    if (!validation()) return
    try {
      await ProjectService.createProject(project);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
    
    e.preventDefault(); 
    setProject(initialValue);
  };

  const validation = () => {
    if (project.name === "") {
      alert("Please input Name!");
      return false
    }
    if (project.expectedHours === 0) {
      alert("Please input Expected Hours!");
      return false
    }
    return true
  }

  const onCancel = () => {
    window.location.href = '/';
  }

  return (
    <div className="add-page">
      <div>
        <div className='add-title title'>Create Project</div>
        <div>
          <div className="add-item">
            <div style={{marginRight: 10}}>
              <div>Name</div>
              <input
                type="text"
                name="name"
                placeholder="Enter Project Name"
                onChange={handleChange}
                value={project.name}
              />
            </div>
            <div>
              <div>Expected Hours</div>
              <input
                type="number"
                name="expectedHours"
                placeholder="Enter ExpectedHours"
                onChange={handleChange}
                value={project.expectedHours}
              />
            </div>
          </div>
          <div className="add-page-btn">
            <button style={{marginRight: 10}} onClick={onCancel}>Cancel</button>
            <button onClick={onCreate}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};
