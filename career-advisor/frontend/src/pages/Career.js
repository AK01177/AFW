import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  useTheme,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaUserTie, FaEdit, FaCheck } from 'react-icons/fa';

const Career = () => {
  const [loading, setLoading] = useState(false);
  const [careerInsights, setCareerInsights] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [answers, setAnswers] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.assessmentAnswers) {
      setAnswers(user.assessmentAnswers);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Update the answers in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedUser = {
      ...user,
      assessmentAnswers: answers
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleAnswerChange = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError('');
    setCareerInsights(null);

    try {
      // Format the answers for AI input
      const formattedInput = Object.entries(answers)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('\n');

      const prompt = `As a career advisor, analyze these career assessment answers and provide detailed, personalized career advice. Include potential career paths, required skills, and actionable steps.

Career Assessment Answers:
${formattedInput}

Career Advice:`;

      const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer hf_YourHuggingFaceToken', // Replace with your Hugging Face token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.1,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      if (data && data[0] && data[0].generated_text) {
        // Extract the response after the prompt
        const fullText = data[0].generated_text;
        const advice = fullText.substring(prompt.length).trim();
        setCareerInsights(advice);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Sorry, there was an error generating career insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAnswerField = (key, value) => {
    if (isEditing) {
      return (
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={Array.isArray(value) ? value.join(', ') : value}
          onChange={(e) => handleAnswerChange(key, e.target.value)}
          sx={{ mb: 2 }}
        />
      );
    }
    return (
      <Typography variant="body1" sx={{ mb: 2 }}>
        {Array.isArray(value) ? value.join(', ') : value}
      </Typography>
    );
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Career Insights
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Review your career assessment answers and get personalized insights.
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" color="primary">
                Your Career Assessment Answers
              </Typography>
              {!isEditing ? (
                <Button
                  startIcon={<FaEdit />}
                  onClick={handleEdit}
                  variant="outlined"
                >
                  Edit Answers
                </Button>
              ) : (
                <Button
                  startIcon={<FaCheck />}
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
              )}
            </Box>

            {Object.entries(answers).map(([key, value]) => (
              <Box key={key} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                {renderAnswerField(key, value)}
              </Box>
            ))}

            {!isEditing && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGenerateInsights}
                  disabled={loading}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Generate Career Insights'}
                </Button>
              </Box>
            )}

            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {careerInsights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ mt: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Your Career Insights
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ whiteSpace: 'pre-line' }}
                    >
                      {careerInsights}
                    </Typography>
                  </CardContent>
                </Card>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <FaLightbulb style={{ color: theme.palette.primary.main, marginRight: 8 }} />
                          <Typography variant="h6">Career Paths</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Explore potential career paths that align with your interests and skills.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <FaChartLine style={{ color: theme.palette.primary.main, marginRight: 8 }} />
                          <Typography variant="h6">Skills Development</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Identify key skills to develop for your chosen career path.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <FaUserTie style={{ color: theme.palette.primary.main, marginRight: 8 }} />
                          <Typography variant="h6">Action Steps</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Get actionable steps to progress in your career journey.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Career; 