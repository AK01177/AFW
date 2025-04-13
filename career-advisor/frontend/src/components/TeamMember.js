import React from 'react';
import { Container, Box, Typography, Paper, Avatar, Grid, Button, IconButton } from '@mui/material';
import { Person as PersonIcon, ArrowBack, ArrowForward } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const contributors = [
  {
    name: 'Aryan Ranavat',
    role: 'Contributor',
    photo: '/photos/aryan.jpg',
    description: 'Aryan is a passionate developer with expertise in frontend technologies. He has contributed significantly to the user interface and overall user experience of the Career Advisor platform.',
    skills: ['React', 'JavaScript', 'UI/UX Design'],
    email: 'aryan@example.com'
  },
  {
    name: 'Hari Sharma',
    role: 'Contributor',
    photo: '/photos/hari.jpg',
    description: 'Hari specializes in backend development and database management. His contributions have been crucial in building the robust architecture of our platform.',
    skills: ['Node.js', 'MongoDB', 'API Development'],
    email: 'hari@example.com'
  },
  {
    name: 'Rudra Bhatt',
    role: 'Contributor',
    photo: '/photos/rudra.jpg',
    description: 'Rudra is our AI and machine learning expert, responsible for implementing the intelligent career suggestions and assessment algorithms.',
    skills: ['Python', 'Machine Learning', 'Natural Language Processing'],
    email: 'rudra@example.com'
  },
  {
    name: 'Varshil Shah',
    role: 'Contributor',
    photo: '/photos/varshil.jpg',
    description: 'Varshil focuses on system architecture and cloud infrastructure, ensuring our platform is scalable and reliable.',
    skills: ['AWS', 'DevOps', 'System Architecture'],
    email: 'varshil@example.com'
  },
  {
    name: 'Pranamya Sanghvi',
    role: 'Contributor',
    photo: '/photos/pranamya.jpg',
    description: 'Pranamya handles content strategy and user engagement, making sure our platform provides valuable career guidance.',
    skills: ['Content Strategy', 'User Research', 'Career Counseling'],
    email: 'pranamya@example.com'
  },
];

const TeamMember = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const currentIndex = contributors.findIndex(c => c.name.toLowerCase().replace(/\s+/g, '-') === memberId);
  const member = contributors[currentIndex];

  if (!member) {
    return (
      <Container>
        <Typography variant="h4">Member not found</Typography>
      </Container>
    );
  }

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + contributors.length) % contributors.length;
    navigate(`/team/${contributors[prevIndex].name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % contributors.length;
    navigate(`/team/${contributors[nextIndex].name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handlePrevious}
          variant="outlined"
          sx={{ borderRadius: '20px' }}
        >
          Previous
        </Button>
        <Button
          endIcon={<ArrowForward />}
          onClick={handleNext}
          variant="outlined"
          sx={{ borderRadius: '20px' }}
        >
          Next
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 250,
                  height: 250,
                  mb: 3,
                  bgcolor: 'primary.main',
                }}
                src={member.photo}
              >
                {!member.photo && <PersonIcon sx={{ fontSize: 120 }} />}
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {member.role}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {member.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h5" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {member.description}
              </Typography>
              
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Skills & Expertise
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {member.skills.map((skill, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 1,
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                    }}
                  >
                    {skill}
                  </Paper>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TeamMember; 