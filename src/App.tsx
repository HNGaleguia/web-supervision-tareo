import React from 'react';
import './App.css';
import TareoUI from './ui/TareoUI';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<TareoUI />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
