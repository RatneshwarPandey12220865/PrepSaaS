# 🤖 AI Integration Guide - PrepSaaS

## Overview

PrepSaaS uses **Google Gemini AI** to provide intelligent features across the platform. The AI integration is designed with fallback mechanisms, so the app works even without an API key.

---

## ✅ Current AI Features

### 1. **Resume Analysis** ✅ IMPLEMENTED
- **Location**: `backend/utils/gemini.js` → `analyzeResumeWithAI()`
- **Route**: `POST /api/resumes`
- **Features**:
  - Analyzes resume content
  - Provides 5-8 actionable suggestions
  - Focuses on ATS optimization, keywords, formatting
  - Falls back to default suggestions if API unavailable

### 2. **Interview Preparation Tips** ✅ IMPLEMENTED
- **Location**: `backend/utils/gemini.js` → `generateInterviewTips()`
- **Route**: `GET /api/interviews/:id`
- **Features**:
  - Generates personalized tips based on company and role
  - Company-specific research suggestions
  - Role-specific preparation advice
  - Only shows for scheduled interviews

### 3. **Performance Insights** ✅ IMPLEMENTED
- **Location**: `backend/utils/gemini.js` → `generatePerformanceInsights()`
- **Routes**: 
  - `GET /api/dashboard/stats` (top 3 insights)
  - `GET /api/test-results/insights` (full insights)
- **Features**:
  - Analyzes test performance history
  - Identifies strengths and weaknesses
  - Provides personalized study recommendations
  - Suggests practice strategies

### 4. **Test Answer Explanations** ✅ IMPLEMENTED (Available for future use)
- **Location**: `backend/utils/gemini.js` → `explainTestAnswer()`
- **Features**:
  - Explains why answers are correct/incorrect
  - Educational context for learning
  - Can be integrated into test results page

---

## 🔧 Setup Instructions

### Step 1: Get Google Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Add to Backend `.env`

```env
GEMINI_API_KEY=your-actual-api-key-here
```

### Step 3: Install Dependencies

```bash
cd backend
npm install axios
```

*(Already included in package.json)*

---

## 📡 API Endpoints with AI

### Resume Management
```
POST /api/resumes
Body: { content: "resume text..." }
Response: { 
  ...resume,
  aiSuggestions: ["suggestion 1", "suggestion 2", ...]
}
```

### Interview Details
```
GET /api/interviews/:id
Response: {
  ...interview,
  aiTips: ["tip 1", "tip 2", ...]
}
```

### Performance Insights
```
GET /api/test-results/insights
Response: {
  aiInsights: ["insight 1", "insight 2", ...]
}
```

### Dashboard Stats
```
GET /api/dashboard/stats
Response: {
  ...stats,
  aiInsights: ["insight 1", "insight 2", "insight 3"]
}
```

---

## 🛡️ Fallback Behavior

The AI integration is **gracefully degraded**:

1. **No API Key**: Returns default suggestions/tips
2. **API Error**: Catches errors and uses fallback content
3. **Timeout**: 30-second timeout prevents hanging
4. **Network Issues**: App continues to work normally

**Example Fallbacks:**

- **Resume Analysis**: 8 default resume tips
- **Interview Tips**: 4-8 generic preparation tips
- **Performance Insights**: 4 default study recommendations

---

## 🎯 Frontend Integration

### Dashboard
- Shows AI insights card when available
- Displays top 3 performance insights
- Uses Sparkles icon for AI features

### Interview Details
- Shows AI-powered preparation tips
- Only displays for scheduled interviews
- Falls back to default tips if AI unavailable

### Resume Management
- AI analysis happens automatically on save
- Shows suggestions in dedicated section
- Re-analyzes when resume content changes

### Performance Report
- Fetches AI insights separately
- Shows comprehensive analysis
- Displays in dedicated card section

---

## 🔍 Code Structure

```
backend/utils/gemini.js
├── callGeminiAPI()          # Core API call function
├── parseSuggestions()       # Parse AI response
├── analyzeResumeWithAI()    # Resume analysis
├── generateInterviewTips()  # Interview preparation
├── explainTestAnswer()      # Answer explanations
└── generatePerformanceInsights() # Performance analysis
```

---

## 🚀 Future AI Enhancements

Potential features to add:

1. **Smart Question Generation**
   - Generate practice questions based on weak areas
   - Create personalized test sets

2. **Interview Simulation**
   - AI-powered mock interviews
   - Real-time feedback on answers

3. **Learning Path Recommendations**
   - Personalized course suggestions
   - Adaptive learning paths

4. **Resume Optimization**
   - Job-specific resume tailoring
   - Keyword optimization suggestions

5. **Performance Predictions**
   - Predict interview success probability
   - Identify readiness level

---

## 📊 API Usage & Limits

### Google Gemini API Limits (Free Tier)
- **Rate Limit**: 60 requests per minute
- **Daily Limit**: 1,500 requests per day
- **Model**: `gemini-pro` (latest stable)

### Cost Optimization
- **Caching**: Results can be cached to reduce API calls
- **Batching**: Multiple insights in single request
- **Lazy Loading**: Only fetch AI data when needed

---

## 🔐 Security Best Practices

1. **Never commit API keys** - Already in `.gitignore`
2. **Use environment variables** - All keys in `.env`
3. **Rate limiting** - Implement if needed
4. **Error handling** - All errors caught and logged
5. **Input validation** - Content length limits (5000 chars)

---

## 🐛 Troubleshooting

### AI features not working?

1. **Check API Key**:
   ```bash
   # In backend/.env
   GEMINI_API_KEY=your-key-here
   ```

2. **Check API Status**:
   - Visit: https://status.cloud.google.com/
   - Verify Gemini API is operational

3. **Check Backend Logs**:
   ```bash
   cd backend
   npm run dev
   # Look for "Gemini API Error" messages
   ```

4. **Test API Key**:
   ```bash
   # Use curl to test
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_KEY" \
     -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

5. **Fallback Works**:
   - App should show default suggestions
   - No errors should break the app

---

## 📝 Example Usage

### Resume Analysis
```javascript
// Automatically called when creating/updating resume
POST /api/resumes
{
  "content": "John Doe\nSoftware Engineer\n..."
}

// Response includes AI suggestions
{
  "aiSuggestions": [
    "Add quantifiable metrics to your achievements",
    "Include relevant keywords from job descriptions",
    ...
  ]
}
```

### Interview Tips
```javascript
// Automatically generated for scheduled interviews
GET /api/interviews/123

// Response includes AI tips
{
  "company": "Google",
  "role": "Software Engineer",
  "aiTips": [
    "Research Google's recent projects and innovations",
    "Prepare for system design questions",
    ...
  ]
}
```

---

## ✅ Verification Checklist

- [x] Gemini API utility functions created
- [x] Resume analysis integrated
- [x] Interview tips generation integrated
- [x] Performance insights generation integrated
- [x] Answer explanations available (for future use)
- [x] Fallback mechanisms in place
- [x] Frontend displays AI features
- [x] Error handling implemented
- [x] Axios dependency added
- [x] Environment variable configured

---

## 🎉 Summary

**AI Integration Status**: ✅ **COMPLETE**

All AI features are implemented with:
- ✅ Resume analysis
- ✅ Interview preparation tips
- ✅ Performance insights
- ✅ Graceful fallbacks
- ✅ Frontend integration
- ✅ Error handling

The project is ready to use with or without an API key!

---

**Need Help?**
- Check backend console for error messages
- Verify API key in `.env` file
- Test API key with curl command above
- App will work with default suggestions if API unavailable

