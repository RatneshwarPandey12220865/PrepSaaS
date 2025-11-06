const mongoose = require('mongoose');

const courseTopicSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
});

module.exports = mongoose.model('CourseTopic', courseTopicSchema);

