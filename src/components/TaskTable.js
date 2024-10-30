import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Typography, Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleUpdate = async () => {
    setEditTask(null);
    loadTasks();
  };

  return (
    <div style={{ position: 'relative', minHeight: '80vh' }}>
      {tasks.length === 0 ? (
        <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
          No tasks found!
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setEditTask({})}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
      {editTask !== null && (
        <TaskForm task={editTask} onClose={handleUpdate} />
      )}
    </div>
  );
};

export default TaskTable;
