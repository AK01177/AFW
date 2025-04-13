import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChartLine, FaUserTie, FaRobot } from 'react-icons/fa';
import { BsGraphUp, BsBook, BsPeople } from 'react-icons/bs';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <FaGraduationCap size={40} />,
      title: 'Career Assessment',
      description: 'Discover your strengths and ideal career paths through our AI-powered assessment.',
      color: '#4a90e2'
    },
    {
      icon: <FaChartLine size={40} />,
      title: 'Skill Analysis',
      description: 'Get detailed insights into your skills and areas for improvement.',
      color: '#2ecc71'
    },
    {
      icon: <FaUserTie size={40} />,
      title: 'Job Market Insights',
      description: 'Stay updated with the latest trends and opportunities in your field.',
      color: '#e74c3c'
    },
    {
      icon: <FaRobot size={40} />,
      title: 'AI Career Assistant',
      description: 'Get personalized career guidance from our AI-powered chatbot.',
      color: '#9b59b6'
    },
    {
      icon: <BsGraphUp size={40} />,
      title: 'Career Path Planning',
      description: 'Plan your career journey with actionable steps and milestones.',
      color: '#f39c12'
    },
    {
      icon: <BsBook size={40} />,
      title: 'Learning Resources',
      description: 'Access curated learning materials to enhance your skills.',
      color: '#1abc9c'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Your AI Career Partner
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Make informed career decisions with personalized guidance and insights powered by AI
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/skills')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                >
                  Start Assessment
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/market')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Explore Features
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{
                  position: 'relative',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  component="img"
                  src="/career-illustration.svg"
                  alt="Career Illustration"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '500px',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))'
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </MotionBox>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Our Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 3
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Transform Your Career?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of professionals who have found their dream career path
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
              }
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </MotionBox>
    </Box>
  );
};

export default Home; 