import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => onDelete(todo.id)}
          onEdit={(updatedTodo) => onEdit(todo.id, updatedTodo)}
        />
      ))}
    </div>
  );
};

export default TodoList;