import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Box } from '@mui/material';

// Components
import Layout from './components/Layout';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CareerAssessment from './pages/CareerAssessment';
import SkillAssessment from './pages/SkillAssessment';
import JobMarket from './pages/JobMarket';
import CareerPath from './pages/CareerPath';
import ResumeCoach from './pages/ResumeCoach';
import NetworkInsights from './pages/NetworkInsights';
import Chatbot from './pages/Chatbot';
import About from './pages/About';
import TeamMember from './components/TeamMember';
import FloatingChatbot from './components/FloatingChatbot';
import Navbar from './components/Navbar';
import Career from './pages/Career';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to career assessment if not completed
  if (!user.careerAssessment && window.location.pathname !== '/career-assessment') {
    return <Navigate to="/career-assessment" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/career-assessment" element={
                <ProtectedRoute>
                  <CareerAssessment />
                </ProtectedRoute>
              } />
              <Route path="/skill-assessment" element={
                <ProtectedRoute>
                  <SkillAssessment />
                </ProtectedRoute>
              } />
              <Route path="/job-market" element={
                <ProtectedRoute>
                  <JobMarket />
                </ProtectedRoute>
              } />
              <Route path="/career-path" element={
                <ProtectedRoute>
                  <CareerPath />
                </ProtectedRoute>
              } />
              <Route path="/resume-coach" element={
                <ProtectedRoute>
                  <ResumeCoach />
                </ProtectedRoute>
              } />
              <Route path="/network-insights" element={
                <ProtectedRoute>
                  <NetworkInsights />
                </ProtectedRoute>
              } />
              <Route path="/chatbot" element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/team/:memberId" element={<TeamMember />} />
              <Route path="/career" element={<Career />} />
            </Routes>
          </Box>
          <FloatingChatbot />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 