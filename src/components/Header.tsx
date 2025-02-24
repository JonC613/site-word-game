import React from 'react';
import { PrimaryButton, DefaultButton, Stack, Text } from '@fluentui/react';

interface HeaderProps {
  inputUsername: string;
  setInputUsername: (value: string) => void;
  handleLogin: () => void;
  usernames: string[];
  handleUsernameClick: (username: string) => void;
  buttonConfigs: any;
}

const Header: React.FC<HeaderProps> = ({
  inputUsername,
  setInputUsername,
  handleLogin,
  usernames,
  handleUsernameClick,
  buttonConfigs
}) => {
  return (
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
  );
};

export default Header;
