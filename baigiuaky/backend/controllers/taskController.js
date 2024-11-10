// controllers/taskController.js
const Task = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  Task.getAll((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createTask = (req, res) => {
  const newTask = req.body;
  Task.create(newTask, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: result.insertId, ...newTask });
    }
  });
};

exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  Task.update(taskId, updatedTask, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: taskId, ...updatedTask });
    }
  });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  Task.delete(taskId, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
};
