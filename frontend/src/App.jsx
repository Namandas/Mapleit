import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import File from './pages/File';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserId(token);
  }, [userId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allfiles/*' element={<File userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
