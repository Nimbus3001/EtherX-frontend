import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [name, setName] = useState('');
  const { login, teamName } = useGame();

  const handleSubmit = (e) => {
    e.preventDefault();
    // We removed the validation. It will now log in "blindly"
    // with whatever name is in the input box (even an empty one).
    login(name.trim());
  };

  // If already logged in, redirect to home
  if (teamName) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container" style={{ maxWidth: '450px' }}>
      <div className="card text-center">
        <h1>EtherX</h1>
        <h2>Team Login</h2>
        <p>Enter your team name to begin the hunt (or just click Start to test).</p>
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <input
            type="text"
            placeholder="Your Team Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            // We removed the 'required' attribute
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1.5rem' }}
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

