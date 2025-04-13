import React, { useState, useRef, useEffect } from 'react';
import './CareerChatbot.css';
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from 'emoji-picker-react';

const CareerChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your career guidance assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(new Event('submit'), transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e, voiceInput = null) => {
    e.preventDefault();
    const messageToSend = voiceInput || input;
    if (!messageToSend.trim()) return;

    const userMessage = { text: messageToSend, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowEmojiPicker(false);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput(prev => prev + emojiObject.emoji);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <FaRobot className="header-icon" />
        <h3>Career Guidance Assistant</h3>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            {message.sender === 'bot' && (
              <div className="message-sticker">
                {index % 3 === 0 ? '🎓' : index % 3 === 1 ? '💼' : '📚'}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content loading">
              <span className="typing-indicator">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about careers, skills, or guidance..."
            disabled={isLoading}
          />
          <div className="input-buttons">
            <button 
              type="button" 
              className="emoji-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <BsEmojiSmile />
            </button>
            <button 
              type="button" 
              className={`voice-button ${isListening ? 'listening' : ''}`}
              onClick={toggleVoiceInput}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            <button type="submit" className="send-button" disabled={isLoading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </form>
    </div>
  );
};

export default CareerChatbot; 