const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    requirement: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
        default: false,
    }
})

module.exports = mongoose.model('Project',projectSchema);