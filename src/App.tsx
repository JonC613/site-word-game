import React, { useState, useEffect } from 'react';
import { Stack, IStackStyles } from '@fluentui/react';
import siteWordsData from './data/sight_words.json';
import StatsPage from './StatsPage';
import { COLORS } from './styles/colors';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import { IButtonStyles } from '@fluentui/react';

const playWordAudio = (word: string) => {
  try {
    const audio = new Audio(`/mp3/${word.toLowerCase()}.mp3`);
    audio.play();
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};

const words: string[] = siteWordsData.sight_words;

const containerStyles: IStackStyles = {
  root: {
    background: COLORS.background.main,
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    overflow: 'hidden' as 'hidden'
  }
};

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
  }),
  stats: {
    root: {
      fontSize: '14px',
      padding: '8px 16px',
      backgroundColor: '#e8f5e9',
      border: '2px solid #4caf50',
      color: '#2e7d32'
    },
    rootHovered: {
      backgroundColor: '#4caf50',
      color: '#ffffff'
    }
  },
  logout: {
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
  },
  reset: {
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
  const [inputUsername, setInputUsername] = useState<string>('');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [incorrectWords, setIncorrectWords] = useState<number>(0);

  useEffect(() => {
    const savedUsernames = localStorage.getItem('usernames');
    if (savedUsernames) {
      setUsernames(JSON.parse(savedUsernames));
    }
  }, []);

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
      const savedCorrectWords = localStorage.getItem(`${username}_correctWords`);
      const savedIncorrectWords = localStorage.getItem(`${username}_incorrectWords`);
      
      if (savedCorrectWords) setCorrectWords(Number(savedCorrectWords));
      if (savedIncorrectWords) setIncorrectWords(Number(savedIncorrectWords));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`${username}_score`, score.toString());
      localStorage.setItem(`${username}_highScore`, highScore.toString());
      localStorage.setItem(`${username}_usedWords`, JSON.stringify(usedWords));
      localStorage.setItem(`${username}_currentWord`, currentWord);
      localStorage.setItem(`${username}_correctWords`, correctWords.toString());
      localStorage.setItem(`${username}_incorrectWords`, incorrectWords.toString());
    }
  }, [score, highScore, usedWords, currentWord, username, correctWords, incorrectWords]);

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
    setCorrectWords(prev => prev + 1);
    playWordAudio(currentWord);
    const newUsedWords = [...usedWords, currentWord];
    if (newUsedWords.length >= words.length) {
      setMessage('Congratulations! You completed all words! Starting new round.');
      setMessageTimeout(3000);
      setUsedWords([]);
      setTimeout(() => {
        setCurrentWord(getRandomWord([], currentWord));
      }, 1500);
    } else {
      setMessage('Great job! +1 point');
      setMessageTimeout(2000);
      setUsedWords(newUsedWords);
      setTimeout(() => {
        setCurrentWord(getRandomWord(newUsedWords, currentWord));
      }, 1500);
    }
  };

  const handleIncorrect = (): void => {
    const newScore = Math.max(0, score - 1);
    setScore(newScore);
    setMessage('Keep trying! -1 point');
    setIncorrectWords(prev => prev + 1);
    playWordAudio(currentWord);
    setTimeout(() => {
      setCurrentWord(getRandomWord(usedWords, currentWord));
    }, 1500);
  };

  const handleRepeat = (): void => {
    setMessage(`Let's say it again: ${currentWord}`);
    playWordAudio(currentWord);
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

  const handleToggleStats = () => {
    setShowStats(prev => !prev);
  };

  return (
    <Stack 
      horizontalAlign="center" 
      verticalAlign="center" 
      styles={containerStyles}
      tokens={{ childrenGap: 25 }}
    >
      {!username ? (
        <Header
          inputUsername={inputUsername}
          setInputUsername={setInputUsername}
          handleLogin={handleLogin}
          usernames={usernames}
          handleUsernameClick={handleUsernameClick}
          buttonConfigs={buttonConfigs}
        />
      ) : showStats ? (
        <StatsPage
          username={username}
          correctWords={correctWords}
          incorrectWords={incorrectWords}
          onBack={handleToggleStats}
        />
      ) : (
        <GameContainer
          username={username}
          score={score}
          highScore={highScore}
          currentWord={currentWord}
          message={message}
          handleCorrect={handleCorrect}
          handleIncorrect={handleIncorrect}
          handleRepeat={handleRepeat}
          handleToggleStats={handleToggleStats}
          handleLogout={handleLogout}
          handleResetProgress={handleResetProgress}
          showStats={showStats}
          correctWords={correctWords}
          incorrectWords={incorrectWords}
          buttonConfigs={buttonConfigs}
        />
      )}
    </Stack>
  );
};

const getRandomWord = (usedWords: string[], currentWord: string): string => {
  const availableWords = words.filter(word => !usedWords.includes(word) && word !== currentWord);
  if (availableWords.length === 0) {
    const newWord = words.filter(word => word !== currentWord)[0] || words[0];
    return newWord;
  }
  return availableWords[Math.floor(Math.random() * availableWords.length)];
};

interface ButtonStyleProps {
  primary?: boolean;
  color: string;
  hoverColor: string;
  borderColor?: string;
}

export default App;