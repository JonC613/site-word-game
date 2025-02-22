import React, { useState, useEffect } from 'react';
import { PrimaryButton, DefaultButton, Stack, Text, IStackStyles, ITextStyles, IButtonStyles } from '@fluentui/react';

// A sample list of sight words
const words: string[] = [
  'the',
  'and',
  'a',
  'to',
  'in',
  'is',
  'you',
  'that',
  'it',
  'of'
];

// Add colorful styles
const containerStyles: IStackStyles = {
  root: {
    background: 'linear-gradient(135deg, #FFE5F1 0%, #B8E8FF 50%, #C9FFE5 100%)',
    height: '100vh',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const gameContainerStyles: IStackStyles = {
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px', // Increased from 800px
    width: '95%', // Increased from 90%
    minHeight: '80vh', // Added to make container taller
    position: 'relative',
    display: 'flex', // Added to help with centering
    flexDirection: 'column', // Added to stack children vertically
    justifyContent: 'space-between', // Added to spread content
    alignItems: 'center', // Added to center horizontally
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="2" cy="2" r="2" fill="%234dd0e1" fill-opacity="0.1"/%3E%3C/svg%3E")',
      borderRadius: '30px',
      zIndex: -1
    }
  }
};

const scoreStyles: IStackStyles = {
  root: {
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    border: '3px solid #4dd0e1'
  }
};

const wordStyles: ITextStyles = {
  root: {
    margin: '40px 0', // Increased vertical margin
    padding: '30px 60px', // Increased padding
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 6px 0 #4db6ac',
    border: '4px solid #4db6ac',
    color: '#00796b',
    cursor: 'pointer',
    transition: 'transform 0.1s',
    fontSize: '64px', // Added larger font size
    fontWeight: 'bold', // Added bold weight
    textAlign: 'center', // Added center alignment
    minWidth: '300px', // Added minimum width
    ':hover': {
      transform: 'scale(1.05)'
    }
  }
};


const getRandomWord = (usedWords: string[], currentWord: string): string => {
  const availableWords = words.filter(word => !usedWords.includes(word) && word !== currentWord);
  if (availableWords.length === 0) {
    const newWord = words.filter(word => word !== currentWord)[0] || words[0];
    return newWord;
  }
  return availableWords[Math.floor(Math.random() * availableWords.length)];
};

// Create a shared button style interface
interface ButtonStyleProps {
  primary?: boolean;
  color: string;
  hoverColor: string;
  borderColor?: string;
}

// Create a function to generate consistent button styles
const getButtonStyles = ({ primary, color, hoverColor, borderColor }: ButtonStyleProps): Partial<IButtonStyles> => ({
  root: {
    borderRadius: '25px',
    padding: '20px 30px',
    minWidth: '120px',
    fontSize: '18px',
    backgroundColor: primary ? color : 'transparent',
    border: primary ? 'none' : `2px solid ${borderColor || color}`,
    color: primary ? '#ffffff' : color,
    boxShadow: primary ? `0 4px 0 ${hoverColor}` : 'none',
    transition: 'all 0.2s ease'
  },
  rootHovered: {
    backgroundColor: primary ? hoverColor : '#ffffff',
    color: primary ? '#ffffff' : hoverColor,
    borderColor: hoverColor,
    boxShadow: primary ? `0 2px 0 ${hoverColor}` : 'none',
    transform: primary ? 'translateY(2px)' : 'none'
  }
});

const buttonConfigs = {
  correct: getButtonStyles({
    primary: true,
    color: '#4caf50',
    hoverColor: '#388e3c'
  }),
  tryAgain: getButtonStyles({
    color: '#f57c00',
    hoverColor: '#ef6c00',
    borderColor: '#ff9800'
  }),
  repeat: getButtonStyles({
    color: '#1976d2',
    hoverColor: '#1565c0',
    borderColor: '#2196f3'
  })
};

const App: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>(getRandomWord([], ''));
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [messageTimeout, setMessageTimeout] = useState<number>(2000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, messageTimeout);
    return () => clearTimeout(timer);
  }, [message, messageTimeout]);

  const handleCorrect = (): void => {
    const newScore = score + 1;
    setScore(newScore);
    setHighScore(Math.max(highScore, newScore));
    
    const newUsedWords = [...usedWords, currentWord];
    if (newUsedWords.length >= words.length) {
      setMessage('Congratulations! You completed all words! Starting new round.');
      setMessageTimeout(3000);
      setUsedWords([]);
      setCurrentWord(getRandomWord([], currentWord));
    } else {
      setMessage('Great job! +1 point');
      setMessageTimeout(2000);
      setUsedWords(newUsedWords);
      setCurrentWord(getRandomWord(newUsedWords, currentWord));
    }
  };

  const handleIncorrect = (): void => {
    const newScore = Math.max(0, score - 1);
    setScore(newScore);
    setMessage('Keep trying! -1 point');
  };

  const handleRepeat = (): void => {
    // In a future update, you might integrate audio playback here.
    setMessage(`Let's say it again: ${currentWord}`);
  };

  return (
    <Stack 
      horizontalAlign="center" 
      verticalAlign="center" 
      styles={containerStyles}
      tokens={{ childrenGap: 25 }}
    >
      <Stack styles={gameContainerStyles}>
        <Text 
          variant="xLarge" 
          styles={{ 
            root: { 
              fontSize: '32px', 
              fontWeight: 'bold',
              color: '#006064',
              textShadow: '2px 2px 0 #ffffff'
            } 
          }}
        >
          Sight Word Learning Game
        </Text>

        <Stack styles={scoreStyles}>
          <Text 
            variant="large" 
            styles={{ root: { fontSize: '24px', color: '#00838f' }}}
          >
            Score: {score}
          </Text>
          <Text 
            variant="medium"
            styles={{ root: { fontSize: '18px', color: '#0097a7' }}}
          >
            High Score: {highScore}
          </Text>
        </Stack>

        <Text variant="xxLarge" styles={wordStyles}>
          {currentWord}
        </Text>

        {message && (
          <Text 
            variant="medium" 
            styles={{ 
              root: { 
                padding: '10px 20px',
                backgroundColor: '#e8f5e9',
                borderRadius: '10px',
                color: '#2e7d32',
                fontWeight: 600
              } 
            }}
          >
            {message}
          </Text>
        )}

        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <PrimaryButton 
            text="Correct! 😊" 
            onClick={handleCorrect}
            styles={buttonConfigs.correct}
          />
          <DefaultButton 
            text="Try Again 🤔" 
            onClick={handleIncorrect}
            styles={buttonConfigs.tryAgain}
          />
          <DefaultButton 
            text="Repeat 🔄" 
            onClick={handleRepeat}
            styles={buttonConfigs.repeat}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default App;
