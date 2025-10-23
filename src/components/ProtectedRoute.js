import React from 'react';
import { useGame } from '../context/GameContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { teamName } = useGame();

  if (!teamName) {
    // If no team name, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the component they asked for
  return children;
};

export default ProtectedRoute;
