const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Schema.Types.ObjectId,
        ref: 'UserType',
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)