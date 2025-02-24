import React from 'react';
import { Text } from '@fluentui/react';
import { COLORS } from '../styles/colors';

interface WordDisplayProps {
  currentWord: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ currentWord }) => {
  return (
    <Text variant="xxLarge" styles={wordStyles}>
      {currentWord}
    </Text>
  );
};

const wordStyles = {
  root: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: COLORS.text.accent,
    textAlign: 'center',
    padding: '30px 60px',
    backgroundColor: COLORS.neutral,
    borderRadius: '20px',
    boxShadow: '0 8px 0 rgba(0, 121, 107, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 0 rgba(0, 121, 107, 0.2)'
    },
    ':active': {
      transform: 'scale(0.98)',
      boxShadow: '0 4px 0 rgba(0, 121, 107, 0.2)'
    }
  }
};

export default WordDisplay;
