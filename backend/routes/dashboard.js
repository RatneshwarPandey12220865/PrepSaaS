const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Interview = require('../models/Interview');
const TestResult = require('../models/TestResult');
const { generatePerformanceInsights } = require('../utils/gemini');

// Get dashboard stats with AI insights
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get total interviews
    const totalInterviews = await Interview.countDocuments({ userId });

    // Get upcoming interview
    const upcomingInterview = await Interview.findOne({
      userId,
      status: 'scheduled',
      date: { $gte: new Date() }
    }).sort({ date: 1 });

    // Get latest test result
    const latestResult = await TestResult.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate('roundId', 'name');

    // Get recent test results for AI insights
    const recentResults = await TestResult.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Generate AI performance insights
    let aiInsights = [];
    if (recentResults.length > 0) {
      try {
        aiInsights = await generatePerformanceInsights(recentResults);
      } catch (error) {
        console.error('AI insights generation error:', error);
      }
    }

    res.json({
      totalInterviews,
      upcomingMock: upcomingInterview ? upcomingInterview.date : null,
      latestScore: latestResult ? Math.round((latestResult.correctAnswers / latestResult.totalQuestions) * 10) : 0,
      aiInsights: aiInsights.length > 0 ? aiInsights.slice(0, 3) : [] // Top 3 insights for dashboard
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
