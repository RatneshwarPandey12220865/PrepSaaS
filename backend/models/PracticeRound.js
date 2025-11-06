const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  type: { type: String, enum: ['mcq', 'text', 'coding'] }
});

const practiceRoundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['aptitude', 'coding', 'hr'], required: true },
  description: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  duration: { type: Number, required: true }, // in minutes
  questions: [questionSchema]
});

module.exports = mongoose.model('PracticeRound', practiceRoundSchema);

