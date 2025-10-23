import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const PuzzlePage = () => {
  const { id } = useParams();
  const { currentPuzzle, solveCurrentPuzzle } = useGame();
  const puzzleId = Number(id);

  // --- This is the barebones puzzle content ---
  // --- YOU WILL EDIT THIS SECTION ---
  const getPuzzleContent = (id) => {
    switch (id) {
      case 1:
        return (
          <div>
            <h3>Riddle for Puzzle 1</h3>
            <p>I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?</p>
            {/* You would add your real puzzle here, e.g., an input, a riddle, an image */}
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Challenge for Puzzle 2</h3>
            <p>What has to be broken before you can use it?</p>
          </div>
        );
      // ... Add cases for 3, 4, 5, 6, 7
      case 8:
        return (
          <div>
            <h3>Final Puzzle (Puzzle 8)</h3>
            <p>What is always in front of you but can’t be seen?</p>
          </div>
        );
      default:
        return <p>Unknown puzzle.</p>;
    }
  }
  // ------------------------------------------

  // Logic to show the correct puzzle
  if (puzzleId < currentPuzzle) {
    // Puzzle already solved
    return (
      <div className="container text-center">
        <div className="card">
          <h2>Puzzle {puzzleId}</h2>
          <p>Your team has already solved this puzzle.</p>
          <Link to="/" className="btn btn-secondary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (puzzleId > currentPuzzle) {
    // Not unlocked yet
    return (
      <div className="container text-center">
        <div className="card">
          <h2>Puzzle {puzzleId}</h2>
          <p>This puzzle is not unlocked yet. Please solve Puzzle {currentPuzzle} first.</p>
          <Link to={`/puzzle/${currentPuzzle}`} className="btn btn-secondary">Go to Current Puzzle</Link>
        </div>
      </div>
    );
  }

  // This is the correct, active puzzle
  return (
    <div className="container">
      <div className="card">
        <h1 className="text-center">Puzzle {puzzleId}</h1>
        
        {/* Your puzzle content goes here */}
        <div className="puzzle-content" style={{ margin: '2.5rem 0' }}>
          {getPuzzleContent(puzzleId)}
        </div>
        
        {/* This button simulates solving. 
          You would replace this with your real puzzle's submit logic.
        */}
        <div className="text-center">
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            (Once you have the answer, click here to submit)
          </p>
          <button 
            className="btn btn-primary"
            onClick={solveCurrentPuzzle}
          >
            Submit Solution for Puzzle {puzzleId}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePage;
