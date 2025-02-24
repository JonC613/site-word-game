import React from 'react';
import { Stack, Text, DefaultButton, IStackStyles } from '@fluentui/react';

interface UserInfoProps {
  username: string;
  handleToggleStats: () => void;
  handleLogout: () => void;
  handleResetProgress: () => void;
  buttonConfigs: any;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  handleToggleStats,
  handleLogout,
  handleResetProgress,
  buttonConfigs
}) => {
  return (
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
          text="Stats 📊"
          onClick={handleToggleStats}
          styles={buttonConfigs.stats}
        />
        <DefaultButton 
          text="Logout" 
          onClick={handleLogout}
          styles={buttonConfigs.logout}
        />
        <DefaultButton 
          text="Reset Progress" 
          onClick={handleResetProgress}
          styles={buttonConfigs.reset}
        />
      </Stack>
    </Stack>
  );
};

const userInfoStyles: IStackStyles = {
  root: {
    position: 'absolute' as 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px'
  }
};

export default UserInfo;
