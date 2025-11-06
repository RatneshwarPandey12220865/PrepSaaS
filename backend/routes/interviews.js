const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Interview = require('../models/Interview');

// Get all interviews
router.get('/', auth, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single interview with AI tips
router.get('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Generate AI-powered interview tips if interview is scheduled
    let aiTips = [];
    if (interview.status === 'scheduled') {
      try {
        const { generateInterviewTips } = require('../utils/gemini');
        aiTips = await generateInterviewTips(interview.company, interview.role);
      } catch (error) {
        console.error('AI tips generation error:', error);
        // Use default tips if AI fails
        aiTips = [
          `Research ${interview.company} thoroughly`,
          `Prepare for ${interview.role} specific questions`,
          `Review your resume and achievements`,
          `Prepare questions to ask the interviewer`
        ];
      }
    }

    res.json({
      ...interview.toObject(),
      aiTips
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create interview
router.post('/', auth, async (req, res) => {
  try {
    const { company, role, package: packageAmount, date } = req.body;

    if (!company || !role || !packageAmount || !date) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const interview = new Interview({
      userId: req.user._id,
      company,
      role,
      package: packageAmount,
      date,
      status: 'scheduled'
    });

    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update interview
router.put('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    const { company, role, package: packageAmount, date, status } = req.body;

    if (company) interview.company = company;
    if (role) interview.role = role;
    if (packageAmount) interview.package = packageAmount;
    if (date) interview.date = date;
    if (status) interview.status = status;

    await interview.save();
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete interview
router.delete('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    await Interview.deleteOne({ _id: req.params.id });
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
