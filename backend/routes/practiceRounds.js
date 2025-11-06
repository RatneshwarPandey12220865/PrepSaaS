const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PracticeRound = require('../models/PracticeRound');

// Get all practice rounds
router.get('/', auth, async (req, res) => {
  try {
    const rounds = await PracticeRound.find().select('-questions.correctAnswer');
    res.json(rounds);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single practice round (with correct answers for testing)
router.get('/:id', auth, async (req, res) => {
  try {
    const round = await PracticeRound.findById(req.params.id);

    if (!round) {
      return res.status(404).json({ message: 'Practice round not found' });
    }

    // Don't send correct answers to client
    const roundWithoutAnswers = {
      ...round.toObject(),
      questions: round.questions.map(q => ({
        question: q.question,
        options: q.options,
        type: q.type
        // correctAnswer is excluded
      }))
    };

    res.json(roundWithoutAnswers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit test
router.post('/submit', auth, async (req, res) => {
  try {
    const { roundId, answers, timeTaken } = req.body;

    if (!roundId || !answers) {
      return res.status(400).json({ message: 'Please provide roundId and answers' });
    }

    // Get the practice round with correct answers
    const round = await PracticeRound.findById(roundId);
    if (!round) {
      return res.status(404).json({ message: 'Practice round not found' });
    }

    // Calculate score
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
    const totalQuestions = round.questions.length;

    // Save test result
    const TestResult = require('../models/TestResult');
    const testResult = new TestResult({
      userId: req.user._id,
      roundId: round._id,
      roundName: round.name,
      roundType: round.type,
      score,
      totalQuestions,
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
