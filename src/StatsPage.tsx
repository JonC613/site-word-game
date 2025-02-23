import React from 'react';
import { Stack, Text, DefaultButton, IStackStyles, ITextStyles } from '@fluentui/react';

interface StatsPageProps {
  username: string;
  correctWords: number;
  incorrectWords: number;
  onBack: () => void;
}

const statsContainerStyles: IStackStyles = {
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '90vw',
    minHeight: '60vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  }
};

const statItemStyles: ITextStyles = {
  root: {
    fontSize: '24px',
    color: '#006064',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    textAlign: 'center'
  }
};

const StatsPage: React.FC<StatsPageProps> = ({ 
  username, 
  correctWords, 
  incorrectWords, 
  onBack 
}) => {
  const totalAttempts = correctWords + incorrectWords;
  const accuracy = totalAttempts > 0 
    ? ((correctWords / totalAttempts) * 100).toFixed(1) 
    : '0';

  return (
    <Stack styles={statsContainerStyles}>
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
        Statistics for {username}
      </Text>

      <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: '100%' } }}>
        <Text styles={statItemStyles}>
          Words Correct: {correctWords}
        </Text>
        <Text styles={statItemStyles}>
          Words Incorrect: {incorrectWords}
        </Text>
        <Text styles={statItemStyles}>
          Total Attempts: {totalAttempts}
        </Text>
        <Text styles={statItemStyles}>
          Accuracy: {accuracy}%
        </Text>
      </Stack>

      <DefaultButton
        text="Back to Game"
        onClick={onBack}
        styles={{
          root: {
            fontSize: '18px',
            padding: '15px 30px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            color: '#1976d2',
            marginTop: '20px'
          },
          rootHovered: {
            backgroundColor: '#2196f3',
            color: '#ffffff'
          }
        }}
      />
    </Stack>
  );
};

export default StatsPage;