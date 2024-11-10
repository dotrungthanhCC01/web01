// src/components/AddTask.js
import React, { useState } from 'react';
import './style.css';

function AddTask({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && dueDate) {
      onAdd({ name: taskName, dueDate });
      setTaskName('');
      setDueDate('');
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Due date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTask;
