const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/practice-rounds', require('./routes/practiceRounds'));
app.use('/api/test-results', require('./routes/testResults'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/courses', require('./routes/courses'));

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

