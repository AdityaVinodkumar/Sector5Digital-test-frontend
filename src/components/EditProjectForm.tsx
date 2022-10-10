import React, { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router';
import { Project } from '../types/types';
import ProjectService from '../services/ProjectService';

export const EditProjectForm = () => {

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
  const [totalWorkedHours, setWorkedHours] = useState<number>(0);
  const params: Params = useParams();

  useEffect(() => {
    getProject();
  }, []);
  
  const getProject = async () => {
    const project = await ProjectService.getProjectByName(params.name);
    setWorkedHours(project.workedHours);
    setProject({ ...project, workedHours: 0 });
  }

  const handleChange = e => {
    if (e.target.name === "expectedHours" || e.target.name === "workedHours"){
      const value = Number(e.target.value);
      setProject({ ...project, [e.target.name]: value });
    }else{
      setProject({ ...project, [e.target.name]: e.target.value});
    }
  };

  const onEdit = async() => {
    try {
      await ProjectService.updateProject(project);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeStatus = () => {
    setProject({ ...project, isCompleted: true });
  }

  const onCancel = () => {
    window.location.href = '/';
  }

  return (
    <>
      {project && 
        <div className="add-page">
          <div>
            <div className='add-title title'>Edit Project</div>
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
                    disabled
                  />
                </div>
                <div style={{marginRight: 10}}>
                  <div>Total Expected Hours (h)</div>
                  <input
                    type="number"
                    name="expectedHours"
                    placeholder="Enter ExpectedHours"
                    disabled
                    onChange={handleChange}
                    value={project.expectedHours}
                  />
                </div>
                <div>
                  <div>Total Worked Hours (h)</div>
                  <input
                    type="number"
                    name="expectedHours"
                    placeholder="Enter ExpectedHours"
                    disabled
                    onChange={handleChange}
                    value={totalWorkedHours}
                  />
                </div>
              </div>
              <div className="add-item">
                <div style={{marginRight: 10}}>
                  <div>Worked Hours (h)</div>
                  <input
                    type="number"
                    name="workedHours"
                    placeholder="Enter Worked Hours"
                    disabled={project.isCompleted}
                    onChange={handleChange}
                    value={project.workedHours}
                  />
                </div>
                <div>
                  <div>Status</div>
                  {project.isCompleted?
                    <>
                      <button style={{marginRight: 10}} disabled>Completed</button>
                    </>:
                    <>
                      <button className="status-btn" onClick={onChangeStatus}>Working</button>
                    </>}
                </div>
              </div>
              <div className="add-page-btn">
                <button style={{marginRight: 10}} onClick={onCancel}>Cancel</button>
                <button onClick={onEdit}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      }  
    </>
  );
};

