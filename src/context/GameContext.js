import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Game Configuration ---
const GAME_PHRASE = "ricardian contract";
const UNIQUE_LETTERS = ['r', 'i', 'c', 'a', 'd', 'n', 'o', 't'];
const TOTAL_PUZZLES = 8;
// --------------------------

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [teamName, setTeamName] = useState(null);
  const [currentPuzzle, setCurrentPuzzle] = useState(1);
  const [revealedLetters, setRevealedLetters] = useState(new Set());
  const [phraseGuessesLeft, setPhraseGuessesLeft] = useState(3);
  
  // Modal states
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isPhraseModalOpen, setIsPhraseModalOpen] = useState(false);
  
  const navigate = useNavigate();

  // --- ACTIONS ---

  // 1. Login
  const login = (name) => {
    setTeamName(name);
    setCurrentPuzzle(1);
    setRevealedLetters(new Set());
    setPhraseGuessesLeft(3);
    navigate('/');
  };

  // 2. Simulate solving a puzzle
  const solveCurrentPuzzle = () => {
    // This is the trigger. In a real app, a backend would confirm this.
    // Here, we just open the "guess letter" modal.
    setIsLetterModalOpen(true);
  };

  // 3. Guess a single letter (after solving)
  const handleLetterGuess = (letter) => {
    const guess = letter.toLowerCase();
    setIsLetterModalOpen(false); // Close the modal

    if (guess && guess.length === 1 && UNIQUE_LETTERS.includes(guess)) {
      // Correct guess!
      setRevealedLetters(prev => new Set(prev).add(guess));
      alert(`Correct! The letter '${guess}' has been revealed.`);
    } else {
      // Wrong guess
      alert(`Sorry, '${guess}' is not one of the 8 unique letters.`);
    }

    // Move to the next puzzle regardless
    if (currentPuzzle < TOTAL_PUZZLES) {
      setCurrentPuzzle(currentPuzzle + 1);
      navigate(`/puzzle/${currentPuzzle + 1}`);
    } else {
      // All puzzles solved!
      alert("All puzzles solved! You can now only guess the final phrase.");
      navigate('/');
    }
  };

  // 4. Guess the final phrase
  const handlePhraseGuess = (phrase) => {
    const guess = phrase.toLowerCase();
    setIsPhraseModalOpen(false);

    if (phraseGuessesLeft <= 0) return;

    setPhraseGuessesLeft(phraseGuessesLeft - 1);

    if (guess === GAME_PHRASE) {
      // WINNER!
      alert(`YOU WIN! The phrase was "${GAME_PHRASE}". Congratulations, ${teamName}!`);
      // Reset game
      navigate('/login');
      setTeamName(null);
    } else {
      // WRONG!
      if (phraseGuessesLeft - 1 > 0) {
        alert(`Incorrect guess. You have ${phraseGuessesLeft - 1} guesses left.`);
      } else {
        alert("Game over! You are out of guesses.");
        navigate('/login');
        setTeamName(null);
      }
    }
  };

  // --- Modal Components ---

  const LetterGuessModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Puzzle {currentPuzzle} Solved!</h2>
        <p>You get to guess one of the 8 unique letters.</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLetterGuess(e.target.letter.value);
        }}>
          <input 
            type="text" 
            name="letter" 
            maxLength="1" 
            autoFocus 
            required 
          />
          <button type="submit" className="btn btn-primary">Submit Guess</button>
        </form>
      </div>
    </div>
  );

  const PhraseGuessModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Guess the Phrase</h2>
        <p>You have {phraseGuessesLeft} guesses left.</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          handlePhraseGuess(e.target.phrase.value);
        }}>
          <input 
            type="text" 
            name="phrase" 
            autoFocus 
            required 
          />
          <button type="submit" className="btn btn-primary" style={{marginRight: '1rem'}}>Guess</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsPhraseModalOpen(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );

  // Expose state and functions to the app
  const value = {
    teamName,
    currentPuzzle,
    revealedLetters,
    phraseGuessesLeft,
    gamePhrase: GAME_PHRASE,
    login,
    solveCurrentPuzzle,
    setIsPhraseModalOpen,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
      {isLetterModalOpen && <LetterGuessModal />}
      {isPhraseModalOpen && <PhraseGuessModal />}
    </GameContext.Provider>
  );
};
