import React from 'react';
import { useForm } from '../hooks/useForm';
import ProjectService from "../services/ProjectService";

export const Players = () => {

  const { projects } = useForm();

  const onAdd = () => {
    window.location.href = '/add';
  }
  
  const onDelete = async(id: string) =>{
    window.location.href = '/';
    try {
      await ProjectService.deleteProject(id);
    } catch (error) {
      console.error(error);
    }
  }

  const onEdit = async(name: string) =>{
    window.location.href = `/edit/${name}`;
  }

  return (
    <div className="list-page">
      <div className="add-btn">
        <div className='title'>Project List</div>
        <button style={{marginRight: 10}} onClick={onAdd} >Create Project</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Total Expected Hours (h)</th>
            <th>Total Worked Hours (h)</th>
            <th>Remained Hours (h)</th>
            <th>Completed Percent (%)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.map(project => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.isCompleted?'Completed':'Working'}</td>
              <td>{project.expectedHours}</td>
              <td>{project.workedHours}</td>
              <td>{project.remainedHours}</td>
              <td>{project?.completedPercent?project?.completedPercent.toFixed(2):0}</td>
              <td>
                <button disabled={project.isCompleted} onClick={() => onEdit(project.name)} style={{marginRight: 10}}>Edit</button>
                <button disabled={project.isCompleted} onClick={() => onDelete(project._id)}>Delect</button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};