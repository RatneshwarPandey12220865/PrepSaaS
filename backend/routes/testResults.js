const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TestResult = require('../models/TestResult');
const { generatePerformanceInsights } = require('../utils/gemini');

// Get AI performance insights (must be before /:id route)
router.get('/insights', auth, async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    let aiInsights = [];
    if (results.length > 0) {
      try {
        aiInsights = await generatePerformanceInsights(results);
      } catch (error) {
        console.error('AI insights generation error:', error);
      }
    }

    res.json({ aiInsights });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all test results
router.get('/', auth, async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.user._id })
      .populate('roundId', 'name type difficulty')
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single test result
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await TestResult.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('roundId', 'name type difficulty');

    if (!result) {
      return res.status(404).json({ message: 'Test result not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit test (alternative endpoint)
router.post('/submit', auth, async (req, res) => {
  try {
    const { roundId, answers, timeTaken } = req.body;

    if (!roundId || !answers) {
      return res.status(400).json({ message: 'Please provide roundId and answers' });
    }

    const PracticeRound = require('../models/PracticeRound');
    const round = await PracticeRound.findById(roundId);
    if (!round) {
      return res.status(404).json({ message: 'Practice round not found' });
    }

    let correctAnswers = 0;
    const detailedAnswers = round.questions.map((question, index) => {
      const userAnswer = answers[index]?.userAnswer || '';
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctAnswers++;

      return {
        questionId: index.toString(),
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      };
    });

    const score = Math.round((correctAnswers / round.questions.length) * 100);

    const testResult = new TestResult({
      userId: req.user._id,
      roundId: round._id,
      roundName: round.name,
      roundType: round.type,
      score,
      totalQuestions: round.questions.length,
      correctAnswers,
      timeTaken: timeTaken || '0:00',
      answers: detailedAnswers
    });

    await testResult.save();
    res.status(201).json(testResult);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
