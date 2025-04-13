import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  Card,
  CardContent,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    bio: '',
    skills: '',
    experience: '',
    education: '',
  });
  const [careerAssessment, setCareerAssessment] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Load basic profile data
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        title: user.title || '',
        bio: user.bio || '',
        skills: user.skills || '',
        experience: user.experience || '',
        education: user.education || '',
      });

      // Load career assessment data
      if (user.careerAssessment) {
        setCareerAssessment(user.careerAssessment);
      }
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Get current user
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Update user data in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.email === user.email) {
          return { ...u, ...profile };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Update current user
      localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
      
      // Save detailed profile data
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(profile));
      
      // Show success message
      setOpenSnackbar(true);
      setSnackbarMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const renderAssessmentSection = (sectionTitle, questions) => {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {sectionTitle}
          </Typography>
          {Object.entries(questions).map(([key, value]) => {
            if (!value) return null;
            
            return (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                <Typography variant="body1">
                  {Array.isArray(value) ? value.join(', ') : value}
                </Typography>
              </Box>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                mr: 3,
              }}
              src={JSON.parse(localStorage.getItem('user'))?.profileImage}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                My Profile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your personal information and career preferences
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Career Assessment Summary */}
          {careerAssessment && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Career Assessment Summary
              </Typography>
              
              {renderAssessmentSection('Discover Yourself', {
                activities: careerAssessment.activities,
                passionWork: careerAssessment.passionWork,
                careerValues: careerAssessment.careerValues,
                problemInterests: careerAssessment.problemInterests,
                workPreferences: careerAssessment.workPreferences,
                dailyFeelings: careerAssessment.dailyFeelings,
              })}

              {renderAssessmentSection('Social Influence', {
                externalSuggestions: careerAssessment.externalSuggestions,
                externalPressure: careerAssessment.externalPressure,
                admiredCareers: careerAssessment.admiredCareers,
                influences: careerAssessment.influences,
                secretDream: careerAssessment.secretDream,
              })}

              {renderAssessmentSection('Skills & Background', {
                educationLevel: careerAssessment.educationLevel,
                fieldOfStudy: careerAssessment.fieldOfStudy,
                technicalSkills: careerAssessment.technicalSkills,
                softSkills: careerAssessment.softSkills,
                tools: careerAssessment.tools,
                experience: careerAssessment.experience,
              })}

              {renderAssessmentSection('Career Preferences', {
                workEnvironment: careerAssessment.workEnvironment,
                industries: careerAssessment.industries,
                roles: careerAssessment.roles,
                learningNewSkills: careerAssessment.learningNewSkills,
                location: careerAssessment.location,
                languages: careerAssessment.languages,
                salary: careerAssessment.salary,
                timeline: careerAssessment.timeline,
              })}

              {/* AI Suggestions */}
              {careerAssessment.aiSuggestions && (
                <Card sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      AI Career Suggestions
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {careerAssessment.aiSuggestions}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}

          {/* Profile Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Professional Title"
                  name="title"
                  value={profile.title}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Your work experience..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  placeholder="Your educational background..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 