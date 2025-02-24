import React from 'react';
import { Text } from '@fluentui/react';
import { COLORS } from '../styles/colors';

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <Text variant="medium" styles={messageStyles}>
      {message}
    </Text>
  );
};

const messageStyles = {
  root: {
    padding: '20px 40px',
    backgroundColor: COLORS.feedback.success,
    color: '#FFFFFF',
    borderRadius: '15px',
    fontSize: '24px',
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'slideUp 0.3s ease forwards'
  }
};

export default Message;
