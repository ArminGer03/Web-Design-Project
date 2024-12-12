// backend/routes/questions.js

const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// @route   POST /api/questions
// @desc    Create a new question
// @access  Public (since authentication is mocked)
router.post('/', async (req, res) => {
    const { question, options, correctOption, difficulty, category, relevantQuestions } = req.body;

    // Basic validation
    if (!question || !options || options.length !== 4 || !correctOption || !difficulty || !category) {
        return res.status(400).json({ msg: 'Please enter all required fields with correct formats' });
    }

    try {
        const newQuestion = new Question({
            question,
            options,
            correctOption,
            difficulty,
            category,
            relevantQuestions,
        });

        const savedQuestion = await newQuestion.save();
        res.json(savedQuestion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/questions
// @desc    Get all questions
// @access  Public
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/questions/:id
// @desc    Get a single question by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        res.json(question);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Question not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/questions/:id
// @desc    Update a question by ID
// @access  Public
router.put('/:id', async (req, res) => {
    const { question, options, correctOption, difficulty, category, relevantQuestions } = req.body;

    // Build question object
    const questionFields = {};
    if (question) questionFields.question = question;
    if (options && options.length === 4) questionFields.options = options;
    if (correctOption) questionFields.correctOption = correctOption;
    if (difficulty) questionFields.difficulty = difficulty;
    if (category) questionFields.category = category;
    if (relevantQuestions) questionFields.relevantQuestions = relevantQuestions;

    try {
        let existingQuestion = await Question.findById(req.params.id);
        if (!existingQuestion) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        existingQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { $set: questionFields },
            { new: true }
        );

        res.json(existingQuestion);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Question not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/questions/:id
// @desc    Delete a question by ID
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            console.warn(`Delete attempt failed: Question ID ${req.params.id} not found.`);
            return res.status(404).json({ msg: 'Question not found' });
        }

        await Question.findByIdAndRemove(req.params.id); // This line causes the error
        res.json({ msg: 'Question removed' });
    } catch (err) {
        console.error(`Error deleting question ID ${req.params.id}:`, err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Question not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;
