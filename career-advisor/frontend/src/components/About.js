import React from 'react';
import { Container, Typography, Box, Grid, Avatar, Paper, Button } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const contributors = [
  {
    name: 'Aryan Ranavat',
    role: 'Contributor',
    photo: '/photos/aryan.jpg', // You'll need to add the actual photo path
  },
  {
    name: 'Hari Sharma',
    role: 'Contributor',
    photo: '/photos/hari.jpg', // You'll need to add the actual photo path
  },
  {
    name: 'Rudra Bhatt',
    role: 'Contributor',
    photo: '/photos/rudra.jpg', // You'll need to add the actual photo path
  },
  {
    name: 'Varshil Shah',
    role: 'Contributor',
    photo: '/photos/varshil.jpg', // You'll need to add the actual photo path
  },
  {
    name: 'Pranamya Sanghvi',
    role: 'Contributor',
    photo: '/photos/pranamya.jpg', // You'll need to add the actual photo path
  },
];

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        About Career Advisor
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Career Advisor is a comprehensive platform designed to help individuals navigate their professional journey.
        Our team of dedicated contributors has worked together to create this valuable resource.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
        Our Team
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {contributors.map((contributor, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
                src={contributor.photo}
              >
                {!contributor.photo && <PersonIcon sx={{ fontSize: 50 }} />}
              </Avatar>
              <Typography variant="h6" component="h3" gutterBottom>
                {contributor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {contributor.role}
              </Typography>
              <Button
                component={Link}
                to={`/team/${contributor.name.toLowerCase().replace(/\s+/g, '-')}`}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              >
                View Profile
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About; 