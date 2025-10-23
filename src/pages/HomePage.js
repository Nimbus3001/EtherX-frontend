import React from 'react';
import { useGame } from '../context/GameContext';
import { Link } from 'react-router-dom';
import PhraseDisplay from '../components/PhraseDisplay';

const HomePage = () => {
  const { 
    teamName, 
    currentPuzzle, 
    phraseGuessesLeft,
    setIsPhraseModalOpen 
  } = useGame();
  
  // --- FIX ---
  // We must define TOTAL_PUZZLES *before* we use it.
  const TOTAL_PUZZLES = 8; // Make sure this matches GameContext
  const allPuzzlesDone = currentPuzzle > TOTAL_PUZZLES;
  // -----------

  return (
    <div className="container">
      <div className="card text-center">
        <h2>Welcome, Team {teamName}</h2>
        <p>This is your central dashboard. The phrase is being revealed below.</p>
        
        <PhraseDisplay />

        <div style={{ margin: '2rem 0' }}>
          {allPuzzlesDone ? (
            <h3>All puzzles solved!</h3>
          ) : (
            <>
              <h3>Current Task</h3>
              <p>Proceed to the next puzzle. Good luck.</p>
              <Link to={`/puzzle/${currentPuzzle}`} className="btn btn-primary">
                Go to Puzzle {currentPuzzle}
              </Link>
            </>
          )}
        </div>

        <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />

        <div>
          <h3>Guess the Final Phrase</h3>
          <p>You have <strong>{phraseGuessesLeft}</strong> guesses left.</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsPhraseModalOpen(true)}
            disabled={phraseGuessesLeft <= 0}
          >
            Make a Guess
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

