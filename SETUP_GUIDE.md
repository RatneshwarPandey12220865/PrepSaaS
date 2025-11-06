# PrepSaaS - Complete Setup Guide

## 📋 Quick Start Guide

### Prerequisites
- Node.js v16+ installed
- MongoDB installed and running
- npm or yarn package manager

---

## 🚀 Installation Steps

### Step 1: Create Project Structure

```bash
# Create main directory
mkdir prepsaas
cd prepsaas

# Create backend and frontend directories
mkdir backend frontend
```

### Step 2: Backend Setup

```bash
cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken axios
npm install --save-dev nodemon

# Create directories
mkdir config middleware models routes utils

# Create .env file
cat > .env << 'EOF'
PORT=8001
MONGO_URI=mongodb://localhost:27017/prepsaas_db
JWT_SECRET=your-secret-key-change-in-production-abc123xyz789
JWT_EXPIRE=7d
GEMINI_API_KEY=your-gemini-api-key-here
NODE_ENV=development
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
*.log
EOF
```

**Now copy all backend files from the artifacts above:**
- `server.js`
- `seed.js`
- All files in `config/`, `middleware/`, `models/`, `routes/`, `utils/`

### Step 3: Frontend Setup

```bash
cd ../

npx create-react-app frontend
cd frontend

# Install dependencies
npm install react-router-dom axios lucide-react sonner
npm install class-variance-authority clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Create .env file
cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:8001/api
EOF

# Create directories
mkdir -p src/components/ui src/context src/pages src/utils
```

**Now copy all frontend files from the artifacts above:**
- Update `package.json`, `tailwind.config.js`, `postcss.config.js`
- Copy `src/App.js`, `src/App.css`, `src/index.js`, `src/index.css`
- Copy all files in `src/components/ui/`, `src/context/`, `src/pages/`, `src/utils/`

### Step 4: Start MongoDB

```bash
# Make sure MongoDB is running
# On Mac:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
net start MongoDB
```

### Step 5: Seed Database

```bash
cd backend
npm run seed
```

You should see:

```
✅ MongoDB Connected for seeding
🗑️  Cleared existing data
✅ Practice rounds seeded
✅ Course topics seeded
🎉 Database seeding completed!
```

### Step 6: Start Backend

```bash
# In backend directory
npm run dev
```

You should see:

```
✅ MongoDB Connected
🚀 Server running on port 8001
```

### Step 7: Start Frontend

```bash
# In frontend directory (new terminal)
npm start
```

Frontend will open at: http://localhost:3000

---

## 📁 Complete File Structure

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
│   ├── .gitignore
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── ui/
    │   │       ├── button.jsx
    │   │       ├── card.jsx
    │   │       ├── input.jsx
    │   │       └── progress.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── AuthPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── InterviewDetails.jsx
    │   │   ├── PracticeRounds.jsx
    │   │   ├── TestInterface.jsx
    │   │   ├── TestResults.jsx
    │   │   ├── ResumeManagement.jsx
    │   │   ├── CourseCurriculum.jsx
    │   │   └── PerformanceReport.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## ✅ Feature Checklist

### Authentication
- [x] User registration with email/password
- [x] User login with JWT
- [x] Password hashing with bcrypt
- [x] Protected routes
- [x] Auto logout on token expiry

### Dashboard
- [x] Welcome message with user name
- [x] Stats cards (interviews, upcoming mock, latest score)
- [x] Quick action buttons
- [x] My interviews list
- [x] Responsive design

### Practice Rounds
- [x] 3 types of tests (Aptitude, Coding, HR)
- [x] Test selection with difficulty levels
- [x] Duration display
- [x] Customization options

### Test Interface
- [x] Real-time countdown timer
- [x] Question navigation
- [x] Progress bar
- [x] Mark for review
- [x] Auto-submit on timeout
- [x] Manual submit option

### Test Results
- [x] Score with circular progress
- [x] Correct/incorrect breakdown
- [x] Time taken display
- [x] Strengths & weaknesses analysis
- [x] Percentile ranking

### Resume Management
- [x] Upload/paste resume content
- [x] AI-powered analysis (Google Gemini)
- [x] Personalized suggestions
- [x] Multiple resume versions
- [x] Timestamp tracking

### Course Curriculum
- [x] Topics organized by category
- [x] Progress tracking (not started, in progress, completed)
- [x] Difficulty levels
- [x] Overall progress percentage
- [x] Expandable categories

### Performance Report
- [x] Best score display
- [x] Average score calculation
- [x] Total tests taken
- [x] Historical test results
- [x] Detailed breakdown per test

### Interview Management
- [x] Create interviews
- [x] View interview details
- [x] Interview preparation tips
- [x] Status tracking
- [x] Date scheduling

---

## 🎨 Design Features

- Modern dark theme with gradient accents
- Glass-morphism effects
- Pink-purple gradient buttons
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Custom fonts (Space Grotesk, Inter)
- Professional color scheme
- Toast notifications
- Loading states

---

## 🔧 Technology Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Bcrypt
- **AI Integration**: Google Gemini API
- **HTTP Client**: Axios

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Notifications**: Sonner
- **HTTP Client**: Axios

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
```

### Dashboard
```
GET    /api/dashboard/stats  - Get dashboard statistics
```

### Interviews
```
GET    /api/interviews       - Get all interviews
POST   /api/interviews       - Create interview
GET    /api/interviews/:id   - Get interview by ID
PUT    /api/interviews/:id   - Update interview
DELETE /api/interviews/:id   - Delete interview
```

### Practice Rounds
```
GET    /api/practice-rounds     - Get all rounds
GET    /api/practice-rounds/:id - Get specific round
POST   /api/practice-rounds/submit - Submit test
```

### Test Results
```
GET    /api/test-results     - Get all results
GET    /api/test-results/:id - Get specific result
```

### Resumes
```
GET    /api/resumes          - Get all resumes
POST   /api/resumes          - Analyze resume with AI
GET    /api/resumes/:id      - Get specific resume
```

### Courses
```
GET    /api/courses/topics   - Get all topics with progress
POST   /api/courses/progress - Update topic progress
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=8001
MONGO_URI=mongodb://localhost:27017/prepsaas_db
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8001/api
```

---

## 🐛 Troubleshooting

### Backend won't start
- **Check MongoDB**: Ensure MongoDB is running
- **Check port**: Make sure port 8001 is available
- **Check .env**: Verify all environment variables are set
- **Check dependencies**: Run `npm install` again

### Frontend won't connect
- **Check backend**: Ensure backend is running on port 8001
- **Check .env**: Verify REACT_APP_API_URL is correct
- **Clear cache**: Delete node_modules and reinstall
- **Check browser console**: Look for CORS or network errors

### Database seeding fails
- **Check MongoDB**: Ensure MongoDB is running
- **Check connection**: Verify MONGO_URI in .env
- **Clear database**: Drop prepsaas_db and try again
- **Check models**: Ensure all model files are correct

### AI features not working
- **Get API key**: Sign up at https://makersuite.google.com/app/apikey
- **Update .env**: Add your GEMINI_API_KEY
- **Restart backend**: Stop and restart the server
- **Check fallback**: App will use default suggestions if API fails

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. **Create production .env**:
```env
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=super-secret-production-key
GEMINI_API_KEY=your-api-key
NODE_ENV=production
```

2. **Add Procfile**:
```
web: node server.js
```

3. **Deploy**:
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. **Update .env.production**:
```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

2. **Build**:
```bash
npm run build
```

3. **Deploy to Vercel**:
```bash
npm i -g vercel
vercel --prod
```

---

## 📝 Testing

### Test User Registration
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Enter:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
4. Click "Sign Up"

### Test Practice Rounds
1. Login to dashboard
2. Click "Practice Rounds"
3. Select "Aptitude Test"
4. Click "Start"
5. Answer questions
6. Submit test
7. View results

### Test AI Resume Analysis
1. Login to dashboard
2. Click "Resume Management"
3. Click "Create New Resume"
4. Paste resume content
5. Click "Analyze with AI"
6. View suggestions

---

## 📊 Sample Data

The seed script includes:
- **3 Practice Rounds**: Aptitude, Coding, HR (30 questions total)
- **11 Course Topics**: Across 4 categories
- **Users**: Create your own via registration

---

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🎉 Credits

Built with ❤️ using:
- React
- Node.js
- Express
- MongoDB
- Tailwind CSS
- Google Gemini AI

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check browser console for errors
5. Check backend terminal for errors

---

## 🔄 Updates & Maintenance

### To update dependencies:

**Backend**:
```bash
cd backend
npm update
```

**Frontend**:
```bash
cd frontend
npm update
```

### To clear database:
```bash
mongo
use prepsaas_db
db.dropDatabase()
exit
```

Then run `npm run seed` again.

---

## ✨ Features Coming Soon

- [ ] Video interview practice
- [ ] Mock interview scheduling with mentors
- [ ] Code editor for coding challenges
- [ ] Social features (study groups, leaderboards)
- [ ] Email notifications
- [ ] Mobile application
- [ ] LinkedIn integration
- [ ] Export resume as PDF
- [ ] Interview feedback system
- [ ] Performance analytics dashboard

---

**Happy Coding! 🚀**

For questions or issues, please check the documentation or create an issue on GitHub.

