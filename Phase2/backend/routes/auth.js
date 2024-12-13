const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;

    // Simple validation
    if (!username) {
        return res.status(400).json({ msg: 'Username is required' });
    }
    if (!email) {
        return res.status(400).json({ msg: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ msg: 'Password is required' });
    }
    if (!role) {
        return res.status(400).json({ msg: 'Role is required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            username,
            email,
            password,
            role: role || 'user',
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Create and sign JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   POST /api/auth/update-score
// @desc    Update user's score and answered questions
// @access  Private
router.post('/update-score', authMiddleware, async (req, res) => {
    const { questionId, points } = req.body;

    if (!questionId || typeof points !== 'number') {
        return res.status(400).json({ msg: 'Invalid input' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Check if the question is already answered
        if (user.answeredQuestions.includes(questionId)) {
            return res.status(400).json({ msg: 'Question already answered' });
        }

        // Update score and add question to answeredQuestions
        user.score += points;
        user.answeredQuestions.push(questionId);

        if (points !== 0) {
            user.correct = (user.correct || 0) + 1;
        }

        await user.save();
        res.json({ msg: 'Score updated successfully', score: user.score });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/leaderboard
// @desc    Get leaderboard sorted by score
// @access  Private
router.get('/leaderboard', authMiddleware, async (req, res) => {
    try {
        // Fetch users with role 'user' and sort them by score in descending order
        const users = await User.find({ role: 'user' }) // Filter by role
            .select('username answeredQuestions correct score')
            .sort({ score: -1 }) // Sort by score in descending order
            .lean();

        // Map the users to create a leaderboard with rank
        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            totalQuestions: user.answeredQuestions.length,
            correct: user.correct || 0,
            score: user.score,
        }));

        // Respond with the leaderboard
        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




module.exports = router;
