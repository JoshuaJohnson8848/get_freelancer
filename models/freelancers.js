const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freelancerSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  education: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Freelancer',freelancerSchema)
