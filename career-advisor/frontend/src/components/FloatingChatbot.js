import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Collapse,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Chat as ChatIcon, Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Hello! I\'m your AI career assistant. How can I help you today?',
      sender: 'bot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.1,
          },
        }),
      });

      const data = await response.json();
      
      if (data && data[0] && data[0].generated_text) {
        const botResponse = {
          text: data[0].generated_text,
          sender: 'bot',
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                width: 350,
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                    <ChatIcon />
                  </Avatar>
                  <Typography variant="h6">AI Assistant</Typography>
                </Box>
                <IconButton
                  onClick={() => setIsOpen(false)}
                  sx={{ color: 'white' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '80%',
                        bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.100',
                        color: msg.sender === 'user' ? 'white' : 'text.primary',
                        borderRadius: 2,
                      }}
                    >
                      <Typography>{msg.text}</Typography>
                    </Paper>
                  </Box>
                ))}
                {isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '80%',
                        bgcolor: 'grey.100',
                        borderRadius: 2,
                      }}
                    >
                      <CircularProgress size={20} />
                    </Paper>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 60,
            height: 60,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <ChatIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </motion.div>
    </Box>
  );
};

export default FloatingChatbot; 