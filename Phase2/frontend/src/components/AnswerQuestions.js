import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link, useParams } from 'react-router-dom';

function AnswerQuestions() {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (questions.length > 0 && id) {
            filterQuestions();
        }
    }, [questions, id]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const userRes = await axios.get('/api/auth/user', {
                headers: { 'x-auth-token': token },
            });

            setCurrentUser(userRes.data);
            setAnsweredQuestions(userRes.data.answeredQuestions || []);

            const questionRes = await axios.get('/api/questions?populate=category');
            setQuestions(questionRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
            setLoading(false);
        }
    };

    const filterQuestions = () => {
        const filtered = questions.filter(
            (question) =>
                question.category._id === id && !answeredQuestions.includes(question._id)
        );
        setFilteredQuestions(filtered);
    };

    const handleOptionChange = (questionId, option) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };

    const handleAnswerSubmit = async (e, questionId) => {
        e.preventDefault();
    
        if (answeredQuestions.includes(questionId)) {
            alert('You have already answered this question.');
            return;
        }
    
        const selectedAnswer = selectedAnswers[questionId];
        if (!selectedAnswer) {
            alert('Please select an option before submitting!');
            return;
        }
    
        const question = filteredQuestions.find((q) => q._id === questionId);
    
        if (!question) {
            console.error('Question not found.');
            return;
        }
    
        const isCorrect = selectedAnswer === question.options[question.correctOption - 1];
        const points = isCorrect
            ? question.difficulty === 'easy'
                ? 20
                : question.difficulty === 'medium'
                ? 50
                : 100
            : 0;
    
        setFeedback((prev) => ({
            ...prev,
            [questionId]: {
                isCorrect,
                correctOption: question.options[question.correctOption - 1],
            },
        }));
    
        try {
            const token = localStorage.getItem('token');
    
            // Update the score and `correct` field if the answer is correct
            const updateData = {
                questionId,
                points,
            };
            if (isCorrect) {
                updateData.incrementCorrect = 1; // Custom payload field to indicate incrementing `correct`
            }
    
            await axios.post('/api/auth/update-score', updateData, {
                headers: { 'x-auth-token': token },
            });
    
            setAnsweredQuestions((prev) => [...prev, questionId]);
    
            if (isCorrect) {
                setCurrentUser((prev) => ({
                    ...prev,
                    score: prev.score + points,
                    correct: (prev.correct || 0) + 1, // Increment correct count in UI
                }));
            }
        } catch (err) {
            console.error('Error updating score:', err);
            setError('Error updating score');
        }
    };
    

    return (
        <main>
            <section className="glass questions-container">
                <h2>All Questions</h2>
                {loading && <p>Loading questions...</p>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && (
                    <div className="questions-list">
                        {filteredQuestions.map((q) => (
                            <div className="question-item" key={q._id}>
                                <div className="question-header">
                                    <h3>{q.question}</h3>
                                </div>
                                <p className="question-text">{q.question}</p>

                                <form
                                    className="options-list"
                                    onSubmit={(e) => handleAnswerSubmit(e, q._id)}
                                >
                                    {q.options.map((opt, index) => (
                                        <div key={index} className="option-item">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${q._id}`}
                                                    value={opt}
                                                    onChange={() => handleOptionChange(q._id, opt)}
                                                    disabled={answeredQuestions.includes(q._id)}
                                                />
                                                <strong>Option {index + 1}:</strong> {opt}
                                            </label>
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="submit-answer-btn"
                                        disabled={answeredQuestions.includes(q._id)}
                                    >
                                        Submit Answer
                                    </button>
                                </form>

                                {feedback[q._id] && (
                                    <div
                                        className="feedback"
                                        style={{
                                            color: feedback[q._id].isCorrect ? 'green' : 'red',
                                        }}
                                    >
                                        <p>
                                            {feedback[q._id].isCorrect
                                                ? 'Correct!'
                                                : 'Incorrect.'}{' '}
                                            The correct answer is: {feedback[q._id].correctOption}
                                        </p>
                                    </div>
                                )}

                                <p className="question-details">
                                    <strong>Difficulty:</strong>{' '}
                                    {q.difficulty.charAt(0).toUpperCase() +
                                        q.difficulty.slice(1)}{' '}
                                    | <strong>Category:</strong> {q.category.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <Link to="/player-categories" className="dashboard-link">
                    <button>Back to Questions Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default AnswerQuestions;
