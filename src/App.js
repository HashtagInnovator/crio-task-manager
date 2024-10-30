import React from 'react';
import TaskTable from './components/TaskTable';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <TaskTable />
      </Container>
    </>
  );
}

export default App;
