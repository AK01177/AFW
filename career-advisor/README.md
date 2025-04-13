# Career Advisor

A modern career guidance platform that helps users discover their career paths and get personalized recommendations.

## Features

- Career Assessment
- Skill Assessment
- AI-powered Career Suggestions
- Job Market Analysis
- Resume Coach
- Network Insights
- Interactive Chatbot

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repository-url>
cd career-advisor
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Create environment variables
Create a `.env` file in the frontend directory with:
```
REACT_APP_HUGGINGFACE_TOKEN=your_huggingface_token
```

### Development

To run the development server:
```bash
cd frontend
npm start
```

### Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure the following settings:
   - Framework Preset: Create React App
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build
5. Add environment variables
6. Deploy

## Environment Variables

- `REACT_APP_HUGGINGFACE_TOKEN`: Your Hugging Face API token

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 