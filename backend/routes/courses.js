const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CourseTopic = require('../models/CourseTopic');
const UserProgress = require('../models/UserProgress');

// Get all topics with user progress
router.get('/topics', auth, async (req, res) => {
  try {
    const topics = await CourseTopic.find();
    const userId = req.user._id;

    // Get user progress for all topics
    const progressData = await UserProgress.find({ userId });
    const progressMap = {};
    progressData.forEach(p => {
      progressMap[p.topicId.toString()] = p.status;
    });

    // Combine topics with progress
    const topicsWithProgress = topics.map(topic => ({
      ...topic.toObject(),
      status: progressMap[topic._id.toString()] || 'not_started'
    }));

    // Group by category
    const grouped = {};
    topicsWithProgress.forEach(topic => {
      if (!grouped[topic.category]) {
        grouped[topic.category] = [];
      }
      grouped[topic.category].push(topic);
    });

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update topic progress
router.post('/progress', auth, async (req, res) => {
  try {
    const { topicId, status } = req.body;

    if (!topicId || !status) {
      return res.status(400).json({ message: 'Please provide topicId and status' });
    }

    if (!['not_started', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Check if topic exists
    const topic = await CourseTopic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Update or create progress
    let progress = await UserProgress.findOne({
      userId: req.user._id,
      topicId
    });

    if (progress) {
      progress.status = status;
      progress.updatedAt = new Date();
    } else {
      progress = new UserProgress({
        userId: req.user._id,
        topicId,
        status
      });
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get overall progress
router.get('/progress', auth, async (req, res) => {
  try {
    const totalTopics = await CourseTopic.countDocuments();
    const completedTopics = await UserProgress.countDocuments({
      userId: req.user._id,
      status: 'completed'
    });

    const progressPercentage = totalTopics > 0
      ? Math.round((completedTopics / totalTopics) * 100)
      : 0;

    res.json({
      totalTopics,
      completedTopics,
      progressPercentage
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
