import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link, useParams } from 'react-router-dom';

function AnswerQuestions() {
    const [questions, setQuestions] = useState([]);
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


    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const questionRes = await axios.get(`/answer-category/${id}`);
            setQuestions(questionRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
            setLoading(false);
        }
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
    
        const question = questions.find((q) => q.id === questionId);
    
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
            // Include `userAnswer` in the payload
            const updateData = {
                questionId,
                points,
                userAnswer: question.options.indexOf(selectedAnswer) + 1, // Record the user's answer
            };
    
            await axios.post('/update-score', updateData);
    
            setAnsweredQuestions((prev) => [...prev, questionId]);
    
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
                        {questions.map((q) => (
                            <div className="question-item" key={q.id}>
                                <div className="question-header">
                                    <h3>{q.question}</h3>
                                </div>
                                <p className="question-text">{q.question}</p>

                                <form
                                    className="options-list"
                                    onSubmit={(e) => handleAnswerSubmit(e, q.id)}
                                >
                                    {q.options.map((opt, index) => (
                                        <div key={index} className="option-item">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    value={opt}
                                                    onChange={() => handleOptionChange(q.id, opt)}
                                                    disabled={answeredQuestions.includes(q.id)}
                                                />
                                                <strong>Option {index + 1}:</strong> {opt}
                                            </label>
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="submit-answer-btn"
                                        disabled={answeredQuestions.includes(q.id)}
                                    >
                                        Submit Answer
                                    </button>
                                </form>

                                {feedback[q.id] && (
                                    <div
                                        className="feedback"
                                        style={{
                                            color: feedback[q.id].isCorrect ? 'green' : 'red',
                                        }}
                                    >
                                        <p>
                                            {feedback[q.id].isCorrect
                                                ? 'Correct!'
                                                : 'Incorrect.'}{' '}
                                            The correct answer is: {feedback[q.id].correctOption}
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
