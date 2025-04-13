import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ResumeCoach = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resume & Interview Coach
        </Typography>
        <Typography variant="body1">
          Get personalized feedback on your resume and interview preparation.
        </Typography>
      </Box>
    </Container>
  );
};

export default ResumeCoach; 