const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roundId: { type: mongoose.Schema.Types.ObjectId, ref: 'PracticeRound', required: true },
  roundName: String,
  roundType: String,
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  timeTaken: String,
  answers: [{
    questionId: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', testResultSchema);

