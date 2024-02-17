const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    proposal: {
        type: String,
        required: true
    },
    bid: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Proposal', proposalSchema);