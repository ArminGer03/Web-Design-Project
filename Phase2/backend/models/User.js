const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'designer'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    answeredQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],

    score: {
        type: Number,
        default: 0
    },

    correct: {
        type: Number,
        default: 0
    }


});

module.exports = mongoose.model('User', UserSchema);
