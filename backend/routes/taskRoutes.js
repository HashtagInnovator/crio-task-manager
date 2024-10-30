const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find({});
    
    // Apply status logic
    const tasksWithStatus = tasks.map((task) => {
      const taskWithDynamicStatus = {
        ...task._doc,
        dynamicStatus: determineStatus(task) // Attach dynamic status
      };
      return taskWithDynamicStatus;
    });
  
    res.json(tasksWithStatus);
  });
  
// Create a new task
router.post('/', async (req, res) => {
  const { title, description, deadline } = req.body;
  const task = new Task({ title, description, deadline });
  await task.save();
  res.status(201).json(task);
});

// Update a task
router.put('/:id', async (req, res) => {
  const { title, description, deadline, status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, deadline, status },
    { new: true }
  );
  res.json(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
