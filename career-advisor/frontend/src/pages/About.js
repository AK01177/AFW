import React from 'react';
import { Container, Typography, Box, Grid, Avatar, Paper, Button } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const contributors = [
  {
    name: 'Aryan Ranavat',
    role: 'Contributor',
    photo: '/photos/aryan.jpg',
  },
  {
    name: 'Hari Sharma',
    role: 'Contributor',
    photo: '/photos/hari.jpg',
  },
  {
    name: 'Rudra Bhatt',
    role: 'Contributor',
    photo: '/photos/rudra.jpg',
  },
  {
    name: 'Varshil Shah',
    role: 'Contributor',
    photo: '/photos/varshil.jpg',
  },
  {
    name: 'Pranamya Sanghvi',
    role: 'Contributor',
    photo: '/photos/pranamya.jpg',
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        About Career Advisor
      </Typography>
      <Typography variant="body1" paragraph align="center" sx={{ mb: 8 }}>
        Career Advisor is a comprehensive platform designed to help individuals navigate their professional journey.
        Our team of dedicated contributors has worked together to create this valuable resource.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
        Our Team
      </Typography>

      <Grid container spacing={4} justifyContent="center">
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
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 3,
                  bgcolor: 'primary.main',
                  border: '3px solid',
                  borderColor: 'primary.main',
                }}
                src={contributor.photo}
              >
                {!contributor.photo && <PersonIcon sx={{ fontSize: 60 }} />}
              </Avatar>
              <Typography variant="h6" component="h3" gutterBottom align="center">
                {contributor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom align="center">
                {contributor.role}
              </Typography>
              <Button
                component={Link}
                to={`/team/${contributor.name.toLowerCase().replace(/\s+/g, '-')}`}
                variant="contained"
                size="small"
                sx={{ 
                  mt: 2,
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 2,
                }}
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