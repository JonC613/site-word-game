import React from 'react';
import { Text } from '@fluentui/react';
import { COLORS } from '../styles/colors';

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  console.log('Rendering Message component with message:', message); // Debug log
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
    opacity: 1, // Ensure opacity is set to 1 to make the message visible
    transform: 'translateY(0)', // Ensure transform is set to 0 to make the message visible
    animation: 'slideUp 0.3s ease forwards'
  }
};

export default Message;
