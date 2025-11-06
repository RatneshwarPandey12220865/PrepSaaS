const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');
const { analyzeResumeWithAI } = require('../utils/gemini');

// Get all resumes
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create and analyze resume with AI
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Please provide resume content' });
    }

    // Analyze resume with AI
    let aiSuggestions = [];
    try {
      aiSuggestions = await analyzeResumeWithAI(content);
    } catch (error) {
      console.error('AI analysis error:', error);
      // Use default suggestions if AI fails
      aiSuggestions = [
        'Ensure your resume is ATS-friendly with relevant keywords',
        'Highlight quantifiable achievements and metrics',
        'Tailor your resume to match the job description',
        'Use action verbs to describe your experiences',
        'Keep your resume concise (1-2 pages)'
      ];
    }

    const resume = new Resume({
      userId: req.user._id,
      content,
      aiSuggestions
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const { content } = req.body;

    if (content) {
      resume.content = content;

      // Re-analyze with AI if content changed
      try {
        resume.aiSuggestions = await analyzeResumeWithAI(content);
      } catch (error) {
        console.error('AI analysis error:', error);
      }
    }

    await resume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    await Resume.deleteOne({ _id: req.params.id });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
