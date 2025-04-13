import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const JobMarket = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Market Analysis
        </Typography>
        <Typography variant="body1">
          Explore current job market trends and opportunities.
        </Typography>
      </Box>
    </Container>
  );
};

export default JobMarket; 