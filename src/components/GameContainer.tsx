import React from 'react';
import { Stack, Text, IStackStyles } from '@fluentui/react';
import Score from './Score';
import WordDisplay from './WordDisplay';
import Message from './Message';
import Controls from './Controls';
import UserInfo from './UserInfo';

interface GameContainerProps {
  username: string;
  score: number;
  highScore: number;
  currentWord: string;
  message: string;
  handleCorrect: () => void;
  handleIncorrect: () => void;
  handleRepeat: () => void;
  handleToggleStats: () => void;
  handleLogout: () => void;
  handleResetProgress: () => void;
  showStats: boolean;
  correctWords: number;
  incorrectWords: number;
  buttonConfigs: any;
}

const GameContainer: React.FC<GameContainerProps> = ({
  username,
  score,
  highScore,
  currentWord,
  message,
  handleCorrect,
  handleIncorrect,
  handleRepeat,
  handleToggleStats,
  handleLogout,
  handleResetProgress,
  buttonConfigs
}) => {
  return (
    <Stack styles={gameContainerStyles}>
      <UserInfo
        username={username}
        handleToggleStats={handleToggleStats}
        handleLogout={handleLogout}
        handleResetProgress={handleResetProgress}
        buttonConfigs={buttonConfigs}
      />
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
      <Score score={score} highScore={highScore} />
      <WordDisplay currentWord={currentWord} />
      <Message message={message} />
      <Controls
        handleCorrect={handleCorrect}
        handleIncorrect={handleIncorrect}
        handleRepeat={handleRepeat}
        buttonConfigs={buttonConfigs}
      />
    </Stack>
  );
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
    height: '800px',
    position: 'relative' as 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2rem',
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"2\" fill=\"%234dd0e1\" fill-opacity=\"0.1\"/%3E%3C/svg%3E")',
      borderRadius: '30px',
      zIndex: -1
    }
  }
};

export default GameContainer;
