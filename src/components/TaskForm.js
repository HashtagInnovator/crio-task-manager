import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Button
} from '@mui/material';

const TaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDeadline(task.deadline ? new Date(task.deadline).toISOString().substring(0, 10) : '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, deadline };

    if (task && task._id) {
      await updateTask(task._id, newTask);
    } else {
      await createTask(newTask);
    }

    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{task && task._id ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {task && task._id ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
