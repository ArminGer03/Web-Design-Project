// backend/models/Question.js

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [String],
            required: true,
            validate: [arrayLimit, '{PATH} must have exactly 4 options'],
        },
        correctOption: {
            type: Number,
            required: true,
            min: 1,
            max: 4,
        },
        difficulty: {
            type: String,
            required: true,
            enum: ['easy', 'medium', 'hard'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        relevantQuestions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
        ],
    },
    { timestamps: true }
);

// Validator to ensure exactly 4 options
function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model('Question', QuestionSchema);