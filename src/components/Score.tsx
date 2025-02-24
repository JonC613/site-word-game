import React from 'react';
import { Stack, Text } from '@fluentui/react';

interface ScoreProps {
  score: number;
  highScore: number;
}

const Score: React.FC<ScoreProps> = ({ score, highScore }) => {
  return (
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
  );
};

const scoreStyles = {
  root: {
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    border: '3px solid #4dd0e1'
  }
};

export default Score;
