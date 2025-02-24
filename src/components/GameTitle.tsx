import React from 'react';
import { Stack, Text } from '@fluentui/react';

const GameTitle: React.FC = () => {
  return (
    <Stack horizontalAlign="start" styles={{ root: { width: '100%' } }}>
      <Text 
        variant="xLarge" 
        styles={{ 
          root: { 
            fontSize: '36px', 
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            marginLeft: '20px',
            padding: '10px 20px',
            background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
            borderRadius: '10px',
            border: '2px solid #ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          } 
        }}
      >
        Sight Word Learning Game
      </Text>
    </Stack>
  );
};

export default GameTitle;
