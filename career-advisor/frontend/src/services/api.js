const HUGGINGFACE_TOKEN = process.env.REACT_APP_HUGGINGFACE_TOKEN;
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  HUGGINGFACE_API_URL,
  CAREER_ASSESSMENT: `${API_URL}/api/career-assessment`,
  JOB_MARKET: `${API_URL}/api/job-market`,
  RESUME_COACH: `${API_URL}/api/resume-coach`,
};

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`
});

export const getCareerSuggestions = async (answers) => {
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        inputs: JSON.stringify(answers),
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.1,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get career suggestions');
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error('Error getting career suggestions:', error);
    throw error;
  }
};

export const analyzeResume = async (text) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a resume analyzer. Analyze the following resume text and provide a summary of key points and suggestions for improvement."
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}; 