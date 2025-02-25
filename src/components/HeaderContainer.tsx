import React from 'react';
import { Stack } from '@fluentui/react';
import UserInfo from './UserInfo';

interface HeaderContainerProps {
  username: string;
  handleToggleStats: () => void;
  handleLogout: () => void;
  handleResetProgress: () => void;
  buttonConfigs: any;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  username,
  handleToggleStats,
  handleLogout,
  handleResetProgress,
  buttonConfigs
}) => {
  return (
    <Stack horizontal horizontalAlign="space-between" styles={headerContainerStyles}>
      <UserInfo
        username={username}
        handleToggleStats={handleToggleStats}
        handleLogout={handleLogout}
        handleResetProgress={handleResetProgress}
        buttonConfigs={buttonConfigs}
      />
    </Stack>
  );
};

const headerContainerStyles = {
  root: {
    width: '100%',
    padding: '0 20px',
    marginBottom: '20px',
    alignItems: 'center'
  }
};

export default HeaderContainer;
