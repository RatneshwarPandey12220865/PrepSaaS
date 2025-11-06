# PrepSaaS - Interview Preparation Platform

## 🚀 Live Demo
- **Frontend**: https://prep-saa-s.vercel.app
- **Backend API**: https://prepsaas.onrender.com

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB
- **AI**: Google Gemini API
- **Deployment**: Vercel (Frontend) + Render (Backend)

## ✨ Features
- User Authentication (JWT)
- Practice Rounds (Aptitude, Coding, HR)
- AI-powered Resume Analysis
- Performance Tracking
- Course Curriculum
- Modern Glass-morphism UI

---

# Complete Installation Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or Atlas URI)
- npm or yarn

## Step 1: Backend Setup

### 1.1 Create backend directory
```bash
mkdir prepsaas && cd prepsaas
mkdir backend && cd backend
```

### 1.2 Initialize Node project
```bash
npm init -y
```

### 1.3 Install dependencies
```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken axios
npm install --save-dev nodemon
```

### 1.4 Create .env file
```env
PORT=8001
MONGO_URI=mongodb://localhost:27017/prepsaas_db
JWT_SECRET=your-secret-key-change-in-production-abc123xyz
JWT_EXPIRE=7d
GEMINI_API_KEY=your-gemini-api-key-here
NODE_ENV=development
```

### 1.5 Update package.json scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seed.js"
  }
}
```

### 1.6 Create all model files
- Create `models/User.js`
- Create `models/Interview.js`
- Create `models/PracticeRound.js`
- Create `models/TestResult.js`
- Create `models/Resume.js`
- Create `models/CourseTopic.js`
- Create `models/UserProgress.js`

### 1.7 Create all route files
- Create `routes/auth.js`
- Create `routes/dashboard.js`
- Create `routes/interviews.js`
- Create `routes/practiceRounds.js`
- Create `routes/testResults.js`
- Create `routes/resumes.js`
- Create `routes/courses.js`

### 1.8 Create utility files
- Create `config/db.js`
- Create `middleware/auth.js`
- Create `utils/gemini.js`

### 1.9 Create server.js

### 1.10 Create seed.js

### 1.11 Seed the database
```bash
npm run seed
```

### 1.12 Start backend
```bash
npm run dev
```

Backend should be running on http://localhost:8001

---

## Step 2: Frontend Setup

### 2.1 Create React app
```bash
cd ..  # Go back to prepsaas directory
npx create-react-app frontend
cd frontend
```

### 2.2 Install dependencies
```bash
npm install react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react sonner
npm install class-variance-authority clsx tailwind-merge
```

### 2.3 Configure Tailwind (tailwind.config.js)
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 2.4 Create .env file
```env
REACT_APP_API_URL=http://localhost:8001/api
```

### 2.5 Update src/index.css

### 2.6 Create all components
- Create `src/components/ui/button.jsx`
- Create `src/components/ui/card.jsx`
- Create `src/components/ui/input.jsx`
- Create `src/components/ui/progress.jsx`

### 2.7 Create all pages
- Create `src/pages/AuthPage.jsx`
- Create `src/pages/Dashboard.jsx`
- Create `src/pages/InterviewDetails.jsx`
- Create `src/pages/PracticeRounds.jsx`
- Create `src/pages/TestInterface.jsx`
- Create `src/pages/TestResults.jsx`
- Create `src/pages/ResumeManagement.jsx`
- Create `src/pages/CourseCurriculum.jsx`
- Create `src/pages/PerformanceReport.jsx`

### 2.8 Create context & utils
- Create `src/context/AuthContext.jsx`
- Create `src/utils/api.js`

### 2.9 Update src/App.js

### 2.10 Update src/App.css

### 2.11 Start frontend
```bash
npm start
```

Frontend should be running on http://localhost:3000

---

## Step 3: Test the Application

### 3.1 Register a new account
- Go to http://localhost:3000
- Click "Sign Up"
- Enter email, password, full name
- Click "Sign Up"

### 3.2 Test features
- ✅ Dashboard with stats
- ✅ Practice rounds selection
- ✅ Take a test with timer
- ✅ View results with analysis
- ✅ Upload resume for AI analysis
- ✅ View course curriculum
- ✅ Track progress
- ✅ View performance report

---

## Step 4: Get Gemini API Key (Optional for AI features)

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add it to backend/.env as GEMINI_API_KEY

---

## Troubleshooting

### Backend not starting?
- Check if MongoDB is running: `mongod --version`
- Verify .env file exists and has correct values
- Check port 8001 is not in use

### Frontend not connecting?
- Verify backend is running on port 8001
- Check .env file in frontend has correct API URL
- Clear browser cache and restart

### Database seeding failed?
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Delete existing collections and try again

---

## Production Deployment

### Backend (Node.js)
- Use MongoDB Atlas for database
- Set NODE_ENV=production
- Use strong JWT_SECRET
- Deploy to Heroku, Railway, or AWS

### Frontend (React)
- Update REACT_APP_API_URL to production backend URL
- Build: `npm run build`
- Deploy to Vercel, Netlify, or AWS S3

---

## Features Checklist

✅ User Authentication (JWT)
✅ Dashboard with stats
✅ Interview management
✅ Practice rounds (Aptitude, Coding, HR)
✅ Timed tests with auto-submit
✅ Test results with detailed analysis
✅ AI-powered resume analysis (Gemini)
✅ Course curriculum with progress tracking
✅ Performance reports
✅ Responsive design
✅ Modern UI with glass-morphism
✅ Dark theme
✅ Toast notifications

---

## Tech Stack Summary

**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for passwords
- Google Gemini AI
- Axios for API calls

**Frontend:**
- React 18
- React Router v6
- Axios
- Tailwind CSS
- Shadcn UI components
- Lucide icons
- Sonner toasts

---

## File Structure Summary

```
prepsaas/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Interview.js
│   │   ├── PracticeRound.js
│   │   ├── TestResult.js
│   │   ├── Resume.js
│   │   ├── CourseTopic.js
│   │   └── UserProgress.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── interviews.js
│   │   ├── practiceRounds.js
│   │   ├── testResults.js
│   │   ├── resumes.js
│   │   └── courses.js
│   ├── utils/
│   │   └── gemini.js
│   ├── .env
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── input.jsx
│   │   │       └── progress.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── InterviewDetails.jsx
│   │   │   ├── PracticeRounds.jsx
│   │   │   ├── TestInterface.jsx
│   │   │   ├── TestResults.jsx
│   │   │   ├── ResumeManagement.jsx
│   │   │   ├── CourseCurriculum.jsx
│   │   │   └── PerformanceReport.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## Need Help?

Check the following in order:
1. Ensure all dependencies are installed
2. Verify MongoDB is running
3. Check all .env files are configured
4. Run database seeding
5. Check browser console for errors
6. Check backend terminal for errors

---

## License & Credits

This application demonstrates a complete MERN stack implementation
with modern UI/UX design and AI integration.

Built with ❤️ using React, Node.js, Express, and MongoDB

