import React from 'react';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const { id, title, description, tags, priority, dueDate } = todo;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    
    onEdit({
      title,
      description,
      tags,
      priority,
      dueDate: new Date(dueDate).toISOString().slice(0, 16), 
    });
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Tags: {tags}</p>
      <p>Priority: {priority}</p>
      <p>Due Date: {new Date(dueDate).toLocaleString()}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;