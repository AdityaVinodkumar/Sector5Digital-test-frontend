import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Players } from './components/Players';
import { AddProjectForm } from './components/AddProjectForm';
import { EditProjectForm } from './components/EditProjectForm';
import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<Players />} path="/"/>
        <Route element={<AddProjectForm />} path="/add"/>
        <Route element={<EditProjectForm />} path="/edit/:name"/>
      </Routes> 
    </div>
  );
};

export default App;
