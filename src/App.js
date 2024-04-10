import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [interactivity, setInteractivity] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleInteractivityChange = (e) => {
    setInteractivity(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const task = { id: Date.now(), text: newTask, interactivity: interactivity };
      setTasks([...tasks, task]);
      setNewTask('');
      setInteractivity('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const handleSaveEdit = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  return (
    <div>
      <h1>My To Do List</h1>
      <div>
        <input type='text' value={newTask} onChange={handleTaskChange} placeholder='Add Task'/>
        <input type='text' value={interactivity} onChange={handleInteractivityChange} placeholder='Add Interactivity'/>
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type='checkbox'/>
            {editingTaskId === task.id ? (
              <>
                <input type='text' value={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value)}/>
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditTask(task.id, task.text)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


// https://www.youtube.com/watch?v=bOGnc6H6FD0&list=PLg8h8Ej1e8l3YF-GTW1gxmDISO-qt_RSk&index=5&ab_channel=CodersArts