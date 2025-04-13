import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const CareerPath = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Career Path Planning
        </Typography>
        <Typography variant="body1">
          Discover personalized career paths and development opportunities.
        </Typography>
      </Box>
    </Container>
  );
};

export default CareerPath; 