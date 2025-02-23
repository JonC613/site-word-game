import React, { useState, useEffect } from 'react';
import { PrimaryButton, DefaultButton, Stack, Text, IStackStyles, ITextStyles, IButtonStyles } from '@fluentui/react';
import siteWordsData from './data/sight_words.json';

// Create audio player function
const playWordAudio = (word: string) => {
  try {
    const audio = new Audio(`/mp3/${word.toLowerCase()}.mp3`);
    audio.play();
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};

// Get words from the JSON file
const words: string[] = siteWordsData.sight_words;

// Add colorful styles
const containerStyles: IStackStyles = {
  root: {
    background: 'linear-gradient(135deg, #FFE5F1 0%, #B8E8FF 50%, #C9FFE5 100%)',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0
  }
};

const gameContainerStyles: IStackStyles = {
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    width: '90vw',
    minHeight: '80vh',
    height: '800px', // Add fixed height
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Change from space-between to flex-start
    alignItems: 'center',
    gap: '2rem', // Increase gap for better spacing
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

// Add a new style for the message container
const messageContainerStyles: IStackStyles = {
  root: {
    minHeight: '80px', // Fixed height for message area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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

// Update messageStyles for inline display
const messageStyles: ITextStyles = {
  root: {
    padding: '20px',
    backgroundColor: '#e8f5e9',
    borderRadius: '10px',
    color: '#2e7d32',
    fontWeight: 600,
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '1rem 0'
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

const userInfoStyles: IStackStyles = {
  root: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px'
  }
};

const App: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>(getRandomWord([], ''));
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [messageTimeout, setMessageTimeout] = useState<number>(2000);
  const [username, setUsername] = useState<string>('');
  const [inputUsername, setInputUsername] = useState<string>(''); // New state for input value
  const [usernames, setUsernames] = useState<string[]>([]); // State to store all usernames

  // Load usernames from localStorage when the component mounts
  useEffect(() => {
    const savedUsernames = localStorage.getItem('usernames');
    if (savedUsernames) {
      setUsernames(JSON.parse(savedUsernames));
    }
  }, []);

  // Load progress from localStorage when the component mounts
  useEffect(() => {
    if (username) {
      const savedScore = localStorage.getItem(`${username}_score`);
      const savedHighScore = localStorage.getItem(`${username}_highScore`);
      const savedUsedWords = localStorage.getItem(`${username}_usedWords`);
      const savedCurrentWord = localStorage.getItem(`${username}_currentWord`);

      if (savedScore) setScore(Number(savedScore));
      if (savedHighScore) setHighScore(Number(savedHighScore));
      if (savedUsedWords) setUsedWords(JSON.parse(savedUsedWords));
      if (savedCurrentWord) setCurrentWord(savedCurrentWord);
    }
  }, [username]);

  // Save progress to localStorage whenever score, high score, or used words change
  useEffect(() => {
    if (username) {
      localStorage.setItem(`${username}_score`, score.toString());
      localStorage.setItem(`${username}_highScore`, highScore.toString());
      localStorage.setItem(`${username}_usedWords`, JSON.stringify(usedWords));
      localStorage.setItem(`${username}_currentWord`, currentWord);
    }
  }, [score, highScore, usedWords, currentWord, username]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, messageTimeout);
      return () => clearTimeout(timer);
    }
  }, [message, messageTimeout]);

  const handleCorrect = (): void => {
    const newScore = score + 1;
    setScore(newScore);
    setHighScore(Math.max(highScore, newScore));
  
    // Play current word before changing it
    playWordAudio(currentWord);
  
    const newUsedWords = [...usedWords, currentWord];
    if (newUsedWords.length >= words.length) {
      setMessage('Congratulations! You completed all words! Starting new round.');
      setMessageTimeout(3000);
      setUsedWords([]);
      setTimeout(() => {
        setCurrentWord(getRandomWord([], currentWord));
      }, 1500); // 1.5-second delay before showing the next word
    } else {
      setMessage('Great job! +1 point');
      setMessageTimeout(2000);
      setUsedWords(newUsedWords);
      setTimeout(() => {
        setCurrentWord(getRandomWord(newUsedWords, currentWord));
      }, 1500); // 1.5-second delay before showing the next word
    }
  };
  
  const handleIncorrect = (): void => {
    const newScore = Math.max(0, score - 1);
    setScore(newScore);
    setMessage('Keep trying! -1 point');
    playWordAudio(currentWord);
    setTimeout(() => {
      setCurrentWord(getRandomWord(usedWords, currentWord));
    }, 1500); // 1.5-second delay before showing the next word
  };
  
  const handleRepeat = (): void => {
    setMessage(`Let's say it again: ${currentWord}`);
    playWordAudio(currentWord);
    // No need to change the word here
  };

  const handleLogin = () => {
    if (inputUsername && !usernames.includes(inputUsername)) {
      const newUsernames = [...usernames, inputUsername];
      setUsernames(newUsernames);
      localStorage.setItem('usernames', JSON.stringify(newUsernames));
    }
    setUsername(inputUsername);
  };

  const handleUsernameClick = (username: string) => {
    setUsername(username);
  };

  const handleResetProgress = () => {
    setScore(0);
    setHighScore(0);
    setUsedWords([]);
    setCurrentWord(getRandomWord([], ''));
    
    // Clear localStorage for this user
    localStorage.removeItem(`${username}_score`);
    localStorage.removeItem(`${username}_highScore`);
    localStorage.removeItem(`${username}_usedWords`);
    localStorage.removeItem(`${username}_currentWord`);
    
    setMessage('Progress reset successfully!');
  };

  const handleLogout = () => {
    setUsername('');
    setInputUsername('');
  };
  
  return (
    <Stack 
      horizontalAlign="center" 
      verticalAlign="center" 
      styles={containerStyles}
      tokens={{ childrenGap: 25 }}
    >
      {!username ? (
        <Stack>
          <Text variant="xLarge">Enter your username to start:</Text>
          <input 
            type="text" 
            value={inputUsername} 
            onChange={(e) => setInputUsername(e.target.value)} 
          />
          <PrimaryButton 
            text="Login" 
            onClick={handleLogin} 
            styles={buttonConfigs.correct} 
          />
          {usernames.length > 0 && (
            <Stack tokens={{ childrenGap: 10 }}>
              <Text variant="large">Or select a previous username:</Text>
              {usernames.map((name) => (
                <DefaultButton 
                  key={name} 
                  text={name} 
                  onClick={() => handleUsernameClick(name)} 
                  styles={buttonConfigs.repeat} 
                />
              ))}
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack styles={gameContainerStyles}>
          <Stack styles={userInfoStyles}>
            <Text 
              variant="large" 
              styles={{ 
                root: { 
                  color: '#006064',
                  fontWeight: 'semibold'
                } 
              }}
            >
              Welcome, {username}!
            </Text>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <DefaultButton 
                text="Logout" 
                onClick={handleLogout}
                styles={{
                  root: {
                    fontSize: '14px',
                    padding: '8px 16px',
                    backgroundColor: '#e3f2fd',
                    border: '2px solid #2196f3',
                    color: '#1976d2'
                  },
                  rootHovered: {
                    backgroundColor: '#2196f3',
                    color: '#ffffff'
                  }
                }}
              />
              <DefaultButton 
                text="Reset Progress" 
                onClick={handleResetProgress}
                styles={{
                  root: {
                    fontSize: '14px',
                    padding: '8px 16px',
                    backgroundColor: '#ffcdd2',
                    border: '2px solid #ef5350',
                    color: '#c62828'
                  },
                  rootHovered: {
                    backgroundColor: '#ef5350',
                    color: '#ffffff'
                  }
                }}
              />
            </Stack>
          </Stack>
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
    
          <Stack styles={messageContainerStyles}>
            {message && (
              <Text 
                variant="medium" 
                styles={messageStyles}
              >
                {message}
              </Text>
            )}
          </Stack>
    
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
      )}
    </Stack>
  );
};

export default App;