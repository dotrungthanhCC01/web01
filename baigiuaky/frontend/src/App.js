// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách task từ backend (Node.js)
    axios.get('http://localhost:3001/api/tasks')  // Đảm bảo đúng cổng và endpoint
      .then(response => {
        setTasks(response.data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy danh sách task:', error);
      });
  }, []);

  return (
    <div className="App">
      {/* Truyền props tasks cho TaskList */}
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
