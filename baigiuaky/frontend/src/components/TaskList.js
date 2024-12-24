// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import './style.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);  // Dữ liệu tasks sẽ lấy từ backend
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ name: '', dueDate: '' });

  useEffect(() => {
    // Gọi API để lấy danh sách task từ backend (Node.js)
    axios.get('http://localhost:3001/api/tasks')
      .then(response => {
        setTasks(response.data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy danh sách task:', error);
      });
  }, []);  // useEffect sẽ chạy khi component được render lần đầu tiên

  const addTask = (task) => {
    axios.post('http://localhost:3001/api/tasks', task)
      .then(response => {
        setTasks([...tasks, response.data]);  // Thêm task vào danh sách
      })
      .catch(error => {
        console.error('Có lỗi khi thêm task:', error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id)); // Xóa task khỏi danh sách
      })
      .catch(error => {
        console.error('Có lỗi khi xóa task:', error);
      });
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'Todo' ? 'Done' : 'Todo' } : task
    );

    // Cập nhật lại status của task trong database
    axios.put(`http://localhost:3001/api/tasks/${id}`, updatedTasks.find(task => task.id === id))
      .then(() => {
        setTasks(updatedTasks); // Cập nhật danh sách tasks sau khi thay đổi status
      })
      .catch(error => {
        console.error('Có lỗi khi thay đổi status của task:', error);
      });
  };

  const startEditing = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditingTaskId(id);
    setEditingTask({ name: taskToEdit.name, dueDate: taskToEdit.dueDate });
  };

  const saveEditTask = () => {
    axios.put(`http://localhost:3001/api/tasks/${editingTaskId}`, editingTask)
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === editingTaskId ? { ...task, ...editingTask } : task
        ));
        setEditingTaskId(null);
        setEditingTask({ name: '', dueDate: '' });
      })
      .catch(error => {
        console.error('Có lỗi khi lưu chỉnh sửa task:', error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  return (
    <div className="task-list">
      <h1>My work </h1>
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleStatus={toggleTaskStatus}
            onEdit={startEditing} // Truyền hàm startEditing vào TaskItem
          />
        ))}
      </ul>
      {editingTaskId && (
        <div className="edit-task">
          <input
            type="text"
            name="name"
            value={editingTask.name}
            onChange={handleEditChange}
            placeholder="Task name"
          />
          <input
            type="text"
            name="dueDate"
            value={editingTask.dueDate}
            onChange={handleEditChange}
            placeholder="Due date"
          />
          <button onClick={saveEditTask}>Save</button>
        </div>
      )}
      <AddTask onAdd={addTask} />
    </div>
  );
}

export default TaskList;
