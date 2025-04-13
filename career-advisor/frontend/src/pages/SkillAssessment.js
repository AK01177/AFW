import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Slider,
  Button,
  LinearProgress,
  Chip,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaMobile, FaCloud, FaRobot } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const skills = [
  {
    name: 'Programming',
    icon: <FaCode size={24} />,
    description: 'Software development and coding skills',
    color: '#4a90e2'
  },
  {
    name: 'Data Analysis',
    icon: <FaDatabase size={24} />,
    description: 'Data processing and analytics',
    color: '#2ecc71'
  },
  {
    name: 'Mobile Development',
    icon: <FaMobile size={24} />,
    description: 'Mobile app development',
    color: '#e74c3c'
  },
  {
    name: 'Cloud Computing',
    icon: <FaCloud size={24} />,
    description: 'Cloud services and infrastructure',
    color: '#9b59b6'
  },
  {
    name: 'AI/ML',
    icon: <FaRobot size={24} />,
    description: 'Artificial Intelligence and Machine Learning',
    color: '#f39c12'
  }
];

const SkillAssessment = () => {
  const [ratings, setRatings] = useState({});
  const [currentSkill, setCurrentSkill] = useState(0);
  const theme = useTheme();

  const handleRatingChange = (skill, value) => {
    setRatings((prev) => ({
      ...prev,
      [skill]: value
    }));
  };

  const handleNext = () => {
    if (currentSkill < skills.length - 1) {
      setCurrentSkill((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSkill > 0) {
      setCurrentSkill((prev) => prev - 1);
    }
  };

  const calculateProgress = () => {
    const ratedSkills = Object.keys(ratings).length;
    return (ratedSkills / skills.length) * 100;
  };

  return (
    <Container maxWidth="md">
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}
        >
          Skill Assessment
        </Typography>

        <LinearProgress
          variant="determinate"
          value={calculateProgress()}
          sx={{ height: 8, borderRadius: 4, mb: 4 }}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Chip
                icon={skill.icon}
                label={skill.name}
                sx={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '24px',
                  bgcolor: currentSkill === index ? skill.color : 'transparent',
                  color: currentSkill === index ? 'white' : 'inherit',
                  border: `2px solid ${skill.color}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: `${skill.color}20`
                  }
                }}
                onClick={() => setCurrentSkill(index)}
              />
            </Grid>
          ))}
        </Grid>

        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            mb: 4
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                bgcolor: `${skills[currentSkill].color}15`,
                color: skills[currentSkill].color,
                mb: 3,
                mx: 'auto'
              }}
            >
              {skills[currentSkill].icon}
            </Box>

            <Typography
              variant="h5"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {skills[currentSkill].name}
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              {skills[currentSkill].description}
            </Typography>

            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>
                Rate your proficiency (1-10)
              </Typography>
              <Slider
                value={ratings[skills[currentSkill].name] || 5}
                onChange={(_, value) =>
                  handleRatingChange(skills[currentSkill].name, value)
                }
                min={1}
                max={10}
                step={1}
                marks
                sx={{
                  color: skills[currentSkill].color,
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24
                  }
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Beginner
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expert
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </MotionCard>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentSkill === 0}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={currentSkill === skills.length - 1}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
              }
            }}
          >
            Next
          </Button>
        </Box>
      </MotionBox>
    </Container>
  );
};

export default SkillAssessment; 