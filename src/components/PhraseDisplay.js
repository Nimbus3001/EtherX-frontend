import React from 'react';
import { useGame } from '../context/GameContext';
import './PhraseDisplay.css'; // We'll create this next

const PhraseDisplay = () => {
  const { gamePhrase, revealedLetters } = useGame();

  const revealedPhrase = gamePhrase
    .split('')
    .map((char, index) => {
      if (char === ' ') {
        return <span key={index} className="char-space"></span>;
      }
      const isRevealed = revealedLetters.has(char.toLowerCase());
      return (
        <span key={index} className={`char-tile ${isRevealed ? 'revealed' : ''}`}>
          {isRevealed ? char : '_'}
        </span>
      );
    });

  return (
    <div className="phrase-container">
      {revealedPhrase}
    </div>
  );
};

export default PhraseDisplay;
