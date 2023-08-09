
import React, { useState } from 'react';

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Project</h2>
      <div>
        <label htmlFor="projectTitle">Project Title:</label>
        <input
          type="text"
          id="projectTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;