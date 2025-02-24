import React from 'react';
import { Stack, PrimaryButton, DefaultButton } from '@fluentui/react';

interface ControlsProps {
  handleCorrect: () => void;
  handleIncorrect: () => void;
  handleRepeat: () => void;
  buttonConfigs: any;
}

const Controls: React.FC<ControlsProps> = ({
  handleCorrect,
  handleIncorrect,
  handleRepeat,
  buttonConfigs
}) => {
  return (
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
  );
};

export default Controls;
