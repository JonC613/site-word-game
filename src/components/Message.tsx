import React from 'react';
import { Text } from '@fluentui/react';

interface MessageProps {
  message: string;
}

const messageStyles = {
  container: {
    width: '400px', // Set a static width
    height: '100px', // Set a static height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    border: '2px solid #4caf50',
    color: '#2e7d32',
    padding: '10px 20px',
    borderRadius: '10px',
    marginTop: '20px',
    transition: 'opacity 0.5s ease-in-out',
    opacity: 1
  },
  text: {
    fontSize: '24px', // Increase font size
    fontWeight: 'bold', // Make text bold
    textAlign: 'center' // Center align text
  }
};

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div style={messageStyles.container}>
      <Text variant="large" styles={{ root: messageStyles.text }}>{message}</Text>
    </div>
  );
};

export default Message;
