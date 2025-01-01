import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';

function CreateQuestion() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '1',
        difficulty: 'easy',
        category: '',
        relevantQuestions: '',
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { question, option1, option2, option3, option4, correctOption, difficulty, category, relevantQuestions } = formData;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories');
            setCategories(res.data);
        } catch (err) {
            console.error(err);
            setError('Error fetching categories');
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate input
        if (!question.trim() || !option1.trim() || !option2.trim() || !option3.trim() || !option4.trim() || !category) {
            setError('Please fill in all required fields');
            return;
        }

        // Prepare relevantQuestions array
        let relevantQ = [];
        if (relevantQuestions.trim()) {
            relevantQ = relevantQuestions.split(',').map(id => id.trim());
            // Optionally, validate ObjectId format
        }

        const newQuestion = {
            question: question.trim(),
            options: [option1.trim(), option2.trim(), option3.trim(), option4.trim()],
            correctOption: parseInt(correctOption),
            difficulty,
            category, // ObjectId of the category
            relevantQuestions: relevantQ,
        };

        try {
            const res = await axios.post('/api/questions', newQuestion); // Using proxy
            setSuccess('Question created successfully!');
            // Optionally, reset form
            setFormData({
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correctOption: '1',
                difficulty: 'easy',
                category: '',
                relevantQuestions: '',
            });
            // Redirect to view questions after a delay
            setTimeout(() => navigate('/view-questions'), 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || 'Error creating question');
        }
    };

    return (
        <main>
            <section className="glass form-container">
                <h2>Create a New Question</h2>
                <form onSubmit={onSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="input-box">
                        <label htmlFor="question">Question</label>
                        <input type="text" name="question" id="question" value={question} onChange={onChange} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="option1">Option 1</label>
                        <input type="text" name="option1" id="option1" value={option1} onChange={onChange} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="option2">Option 2</label>
                        <input type="text" name="option2" id="option2" value={option2} onChange={onChange} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="option3">Option 3</label>
                        <input type="text" name="option3" id="option3" value={option3} onChange={onChange} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="option4">Option 4</label>
                        <input type="text" name="option4" id="option4" value={option4} onChange={onChange} required />
                    </div>

                    <div className="input-box">
                        <label htmlFor="correctOption">Correct Option</label>
                        <select name="correctOption" id="correctOption" value={correctOption} onChange={onChange} required>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select name="difficulty" id="difficulty" value={difficulty} onChange={onChange} required>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" value={category} onChange={onChange} required>
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="relevantQuestions">Relevant Questions (Optional)</label>
                        <input
                            type="text"
                            name="relevantQuestions"
                            id="relevantQuestions"
                            placeholder="Enter related question IDs (comma-separated)"
                            value={relevantQuestions}
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit">Create Question</button>
                </form>

                <Link to="/questions-management" className="dashboard-link">
                    <button>Back to Questions Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default CreateQuestion;

