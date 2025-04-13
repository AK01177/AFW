const API_KEY = process.env.REACT_APP_HUGGINGFACE_TOKEN;
const API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

if (!API_KEY) {
  console.error('Hugging Face API token is not set in environment variables');
}

const generatePrompt = (answers) => {
  return `Based on the following career assessment answers, provide detailed, personalized suggestions for:

1. Skills to Develop:
   - Technical skills
   - Soft skills
   - Industry-specific skills
   - Learning resources and courses

2. Job Market Opportunities:
   - Suitable job roles
   - Industries to consider
   - Salary expectations
   - Growth potential
   - Current market trends

3. Career Path Recommendations:
   - Short-term goals (1-2 years)
   - Long-term career trajectory
   - Potential career transitions
   - Educational requirements

4. Resume Improvement Tips:
   - Key skills to highlight
   - Formatting suggestions
   - Achievement statements
   - Industry-specific keywords

5. Networking Strategies:
   - Professional associations to join
   - Networking events to attend
   - Online platforms to use
   - Mentorship opportunities

Assessment Answers:
${JSON.stringify(answers, null, 2)}

Please provide specific, actionable recommendations for each section. Format the response in a clear, structured way with bullet points and sub-sections.`;
};

export const getCareerSuggestions = async (answers) => {
  if (!API_KEY) {
    throw new Error('Hugging Face API token is not configured');
  }

  try {
    console.log('Sending request to Hugging Face with answers:', answers);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
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
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    console.log('Hugging Face response:', data);
    return data[0].generated_text;
  } catch (error) {
    console.error('Hugging Face API Error:', error);
    throw error;
  }
};

export const getSectionSpecificAdvice = async (section, answers) => {
  try {
    if (!API_KEY) {
      throw new Error('Hugging Face API token is not configured');
    }

    const sectionPrompts = {
      'job-market': `Based on the following career assessment answers, provide detailed analysis of job market opportunities:
      - Suitable job roles and industries
      - Current market trends and demand
      - Salary expectations and growth potential
      - Required qualifications and skills
      - Geographic considerations
      
      Assessment Answers:
      ${JSON.stringify(answers, null, 2)}`,

      'career-path': `Based on the following career assessment answers, provide detailed career path recommendations:
      - Short-term goals (1-2 years)
      - Long-term career trajectory
      - Potential career transitions
      - Educational requirements
      - Skill development roadmap
      
      Assessment Answers:
      ${JSON.stringify(answers, null, 2)}`,

      'resume': `Based on the following career assessment answers, provide detailed resume improvement tips:
      - Key skills to highlight
      - Formatting and structure suggestions
      - Achievement statements
      - Industry-specific keywords
      - Professional summary
      
      Assessment Answers:
      ${JSON.stringify(answers, null, 2)}`,

      'network': `Based on the following career assessment answers, provide detailed networking strategies:
      - Professional associations to join
      - Networking events to attend
      - Online platforms to use
      - Mentorship opportunities
      - Industry-specific networking tips
      
      Assessment Answers:
      ${JSON.stringify(answers, null, 2)}`
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: JSON.stringify(sectionPrompts[section]),
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
    return data[0].generated_text;
  } catch (error) {
    console.error('Hugging Face API Error:', error);
    throw error;
  }
};

export const parseSuggestions = (response) => {
  try {
    return response;
  } catch (error) {
    console.error('Error parsing suggestions:', error);
    return 'Unable to parse suggestions. Please try again.';
  }
};

export const getStoredSuggestions = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.aiSuggestions || null;
  } catch (error) {
    console.error('Error getting stored suggestions:', error);
    return null;
  }
};

export const updateStoredSuggestions = (suggestions) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      aiSuggestions: suggestions
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error updating stored suggestions:', error);
    throw error;
  }
}; 