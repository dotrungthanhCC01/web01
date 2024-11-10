import React from 'react';
import './style.css';

function TaskItem({ task, onDelete, onToggleStatus, onEdit }) {
  // Kiểm tra task.status và task.dueDate có phải là chuỗi trước khi gọi toLowerCase
  const statusClass = task.status && typeof task.status === 'string' ? task.status.toLowerCase() : '';
  const dueDateClass = task.dueDate && typeof task.dueDate === 'string' ? task.dueDate.toLowerCase() : '';

  return (
    <li className="task-item">
      {/* Vòng tròn đánh dấu trạng thái task */}
      <span
        className={`task-status-circle ${statusClass}`}
        onClick={() => onToggleStatus(task.id)}
      >
        {task.status === 'Done' && '✔'}
      </span>

      {/* Tên của task */}
      <span className="task-name">{task.name}</span>

      {/* Ngày của task với biểu tượng lịch của Font Awesome */}
      <span className={`task-due-date ${dueDateClass}`}>
        <i className="fas fa-calendar-alt"></i> {task.dueDate}
      </span>

      {/* Nút delete */}
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onEdit(task.id)}>Edit</button>
    </li>
  );
}

export default TaskItem;
