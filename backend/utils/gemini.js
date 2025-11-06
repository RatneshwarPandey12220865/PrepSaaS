const axios = require('axios');

// Helper function to call Gemini API
const callGeminiAPI = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your-gemini-api-key-here') {
    return null; // API key not configured
  }

  try {
    // Using the latest Gemini API endpoint
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    if (response.data && response.data.candidates && response.data.candidates[0]) {
      return response.data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid response from Gemini API');
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    throw error;
  }
};

// Parse AI response into array of suggestions
const parseSuggestions = (text, maxItems = 8) => {
  if (!text) return [];
  
  const suggestions = text
    .split('\n')
    .filter(line => line.trim().length > 0 && (line.includes('-') || line.includes('•') || /^\d+\./.test(line)))
    .map(line => line.replace(/^[-•\d\.]\s*/, '').trim())
    .filter(line => line.length > 10) // Filter out very short lines
    .slice(0, maxItems);

  return suggestions;
};

// Analyze resume with AI
const analyzeResumeWithAI = async (resumeContent) => {
  try {
    const defaultSuggestions = [
      'Ensure your resume is ATS-friendly with relevant keywords',
      'Highlight quantifiable achievements and metrics',
      'Tailor your resume to match the job description',
      'Use action verbs to describe your experiences',
      'Keep your resume concise (1-2 pages)',
      'Include a professional summary at the top',
      'List technical skills prominently',
      'Show progression in your career timeline'
    ];

    const prompt = `Analyze the following resume and provide 5-8 specific, actionable suggestions to improve it. Focus on:
1. ATS optimization
2. Quantifiable achievements
3. Keyword optimization
4. Formatting and structure
5. Content clarity
6. Professional presentation

Resume:
${resumeContent.substring(0, 5000)}${resumeContent.length > 5000 ? '...' : ''}

Provide suggestions in a concise, bullet-point format. Each suggestion should be specific and actionable.`;

    const response = await callGeminiAPI(prompt);
    
    if (!response) {
      return defaultSuggestions;
    }

    const suggestions = parseSuggestions(response, 8);
    return suggestions.length > 0 ? suggestions : defaultSuggestions;
  } catch (error) {
    console.error('Resume analysis error:', error.message);
    return [
      'Ensure your resume is ATS-friendly with relevant keywords',
      'Highlight quantifiable achievements and metrics',
      'Tailor your resume to match the job description',
      'Use action verbs to describe your experiences',
      'Keep your resume concise (1-2 pages)'
    ];
  }
};

// Generate interview preparation tips
const generateInterviewTips = async (company, role, jobDescription = '') => {
  try {
    const defaultTips = [
      `Research ${company} thoroughly - check their website, recent news, and company culture`,
      `Prepare for common ${role} interview questions`,
      `Review your resume and be ready to discuss each experience in detail`,
      `Prepare 5-10 thoughtful questions to ask the interviewer`,
      `Practice the STAR method (Situation, Task, Action, Result) for behavioral questions`,
      `Dress professionally and arrive 10-15 minutes early`,
      `Bring multiple copies of your resume and a notepad`,
      `Prepare examples of your achievements and challenges you've overcome`
    ];

    const prompt = `Generate personalized interview preparation tips for an interview at ${company} for the ${role} position. ${
      jobDescription ? `Job Description: ${jobDescription.substring(0, 1000)}` : ''
    }

Provide 6-8 specific, actionable tips. Focus on:
1. Company-specific research
2. Role-specific preparation
3. Technical skills to highlight
4. Behavioral question preparation
5. Questions to ask the interviewer

Format as bullet points.`;

    const response = await callGeminiAPI(prompt);
    
    if (!response) {
      return defaultTips;
    }

    const tips = parseSuggestions(response, 8);
    return tips.length > 0 ? tips : defaultTips;
  } catch (error) {
    console.error('Interview tips generation error:', error.message);
    return [
      `Research ${company} thoroughly`,
      `Prepare for ${role} specific questions`,
      `Review your resume and achievements`,
      `Prepare questions to ask the interviewer`
    ];
  }
};

// Generate test answer explanations
const explainTestAnswer = async (question, userAnswer, correctAnswer, isCorrect) => {
  try {
    const defaultExplanation = isCorrect 
      ? 'Great job! Your answer is correct.'
      : `The correct answer is "${correctAnswer}". Review the concept to understand why.`;

    const prompt = `Explain the following test question and answer:

Question: ${question}
User's Answer: ${userAnswer}
Correct Answer: ${correctAnswer}
Is Correct: ${isCorrect}

Provide a clear, educational explanation:
1. Why the correct answer is right
2. ${!isCorrect ? 'Why the user\'s answer is incorrect' : 'Additional context'}
3. Key concepts to remember

Keep the explanation concise (2-3 sentences).`;

    const response = await callGeminiAPI(prompt);
    
    if (!response) {
      return defaultExplanation;
    }

    // Clean up the response
    return response.trim().substring(0, 500);
  } catch (error) {
    console.error('Answer explanation error:', error.message);
    return isCorrect 
      ? 'Your answer is correct!'
      : `The correct answer is "${correctAnswer}".`;
  }
};

// Generate performance insights
const generatePerformanceInsights = async (testResults) => {
  try {
    const defaultInsights = [
      'Continue practicing regularly to improve your scores',
      'Focus on topics where you scored lower',
      'Review incorrect answers to understand your mistakes',
      'Take time to manage your pace during tests'
    ];

    if (!testResults || testResults.length === 0) {
      return defaultInsights;
    }

    const avgScore = testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length;
    const lowScores = testResults.filter(r => r.score < 70);
    const highScores = testResults.filter(r => r.score >= 85);

    const prompt = `Analyze the following test performance data and provide personalized learning insights:

Average Score: ${Math.round(avgScore)}%
Total Tests: ${testResults.length}
Low Scores (<70%): ${lowScores.length} tests
High Scores (>=85%): ${highScores.length} tests

Recent Test Results:
${testResults.slice(0, 5).map(r => `- ${r.roundName}: ${r.score}% (${r.correctAnswers}/${r.totalQuestions} correct)`).join('\n')}

Provide 4-6 actionable insights focusing on:
1. Strengths to leverage
2. Areas needing improvement
3. Study recommendations
4. Practice strategies

Format as bullet points.`;

    const response = await callGeminiAPI(prompt);
    
    if (!response) {
      return defaultInsights;
    }

    const insights = parseSuggestions(response, 6);
    return insights.length > 0 ? insights : defaultInsights;
  } catch (error) {
    console.error('Performance insights error:', error.message);
    return defaultInsights;
  }
};

module.exports = {
  analyzeResumeWithAI,
  generateInterviewTips,
  explainTestAnswer,
  generatePerformanceInsights
};
