import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './Header.css'; // We'll create this file next

const Header = () => {
  const { teamName } = useGame();

  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <span className="logo-main">The Eye</span>
        <span className="logo-sub">EtherX</span>
      </Link>
      {teamName && (
        <div className="team-info">
          Team: <strong>{teamName}</strong>
        </div>
      )}
    </header>
  );
};

export default Header;
