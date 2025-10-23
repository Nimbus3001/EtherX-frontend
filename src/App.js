import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PuzzlePage from './pages/PuzzlePage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes: Require login to access */}
        <Route 
          path="/" 
          element={<ProtectedRoute><HomePage /></ProtectedRoute>} 
        />
        <Route 
          path="/puzzle/:id" 
          element={<ProtectedRoute><PuzzlePage /></ProtectedRoute>} 
        />
      </Routes>
    </>
  );
}

export default App;
