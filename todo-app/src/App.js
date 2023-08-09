import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterOptions from './components/FilterOptions';
import ProjectForm from './ProjectForm'; 
import ProjectList from './ProjectList'; 

class Todo {
  constructor(id, title, description, tags, priority, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.priority = priority;
    this.dueDate = dueDate;
  }
}

class Project {
  constructor(id, title, todos) {
    this.id = id;
    this.title = title;
    this.todos = todos;
  }
}

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const saveProjectsToStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const saveTodosToStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const addProject = (project) => {
    const newProject = new Project(Date.now(), project.title, []);
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveProjectsToStorage(updatedProjects);
  };

  const addTodo = (todo) => {
    const newTodo = new Todo(
      Date.now(),
      todo.title,
      todo.description,
      todo.tags,
      todo.priority,
      new Date(todo.dueDate)
    );
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos.map((todo) => todo.id));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos.map((todo) => todo.id));
  };

  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos.map((todo) => todo.id));
  };

  const selectProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setTodos(project.todos);
    }
  };


  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
    saveProjectsToStorage(updatedProjects);
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(null);
      setTodos([]);
    }
  };

  const filterTodos = (filter) => {
    let filteredTodos = [];

    switch (filter.type) {
      case 'title':
        filteredTodos = todos.filter((todo) =>
          todo.title.toLowerCase().includes(filter.query.toLowerCase())
        );
        break;
      case 'description':
        filteredTodos = todos.filter((todo) =>
          todo.description.toLowerCase().includes(filter.query.toLowerCase())
        );
        break;
      case 'tag':
        filteredTodos = todos.filter((todo) =>
          todo.tags.includes(filter.query.toLowerCase())
        );
        break;
      case 'priority':
        filteredTodos = todos.filter(
          (todo) => todo.priority.toLowerCase() === filter.query.toLowerCase()
        );
        break;
      default:
        filteredTodos = todos;
    }

    setTodos(filteredTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ProjectForm onAdd={addProject} />
      <ProjectList projects={projects} onSelect={selectProject} onDelete={deleteProject} />
      {selectedProject && (
        <>
          <h2>{selectedProject.title}</h2>
          <TodoForm onAdd={addTodo} />
          <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
          <FilterOptions onFilterChange={filterTodos} />
        </>
      )}
    </div>
  );
};

export default App;