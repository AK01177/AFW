import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const NetworkInsights = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Network Insights
        </Typography>
        <Typography variant="body1">
          Discover networking opportunities and connect with industry professionals.
        </Typography>
      </Box>
    </Container>
  );
};

export default NetworkInsights; 