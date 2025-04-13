import React from 'react';
import CareerChatbot from '../components/CareerChatbot/CareerChatbot';
import { Box, Typography } from '@mui/material';

const Chatbot = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Career Guidance Assistant
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Get personalized career advice and guidance from our AI assistant.
      </Typography>
      <CareerChatbot />
    </Box>
  );
};

export default Chatbot; 