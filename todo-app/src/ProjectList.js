
import React from 'react';

const ProjectList = ({ projects, onSelect, onDelete }) => {
    return (
      <div>
        <h2>Projects</h2>
        {projects.map((project) => (
          <div key={project.id}>
            <span>{project.title}</span>
            <button onClick={() => onSelect(project.id)}>Select</button>
            <button onClick={() => onDelete(project.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

export default ProjectList;