import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router-dom';

function RandomQuestion() {
    const [questions, setQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            selectRandomQuestion();
        }
    }, [questions]);

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

    const selectRandomQuestion = () => {
        const unanswered = questions.filter(
            (question) => !answeredQuestions.includes(question._id)
        );

        if (unanswered.length > 0) {
            const randomIndex = Math.floor(Math.random() * unanswered.length);
            setRandomQuestion(unanswered[randomIndex]);
        } else {
            setRandomQuestion(null); // No unanswered questions left
        }
    };

    const handleOptionChange = (option) => {
        setSelectedAnswer(option);
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedAnswer) {
            alert('Please select an option before submitting!');
            return;
        }
    
        const question = randomQuestion;
        const isCorrect = 
            selectedAnswer === question.options[question.correctOption - 1];
        const points = isCorrect
            ? question.difficulty === 'easy'
                ? 20
                : question.difficulty === 'medium'
                ? 50
                : 100
            : 0;
    
        setFeedback({
            isCorrect,
            correctOption: question.options[question.correctOption - 1],
        });
    
        try {
            const token = localStorage.getItem('token');
    
            // Update score and `correct` field
            const updateData = {
                questionId: question._id,
                points,
            };
            if (isCorrect) {
                updateData.incrementCorrect = 1; // Indicate `correct` increment
            }
    
            await axios.post('/api/auth/update-score', updateData, {
                headers: { 'x-auth-token': token },
            });
    
            setAnsweredQuestions((prev) => [...prev, question._id]);
    
            if (isCorrect) {
                setCurrentUser((prev) => ({
                    ...prev,
                    score: prev.score + points,
                    correct: (prev.correct || 0) + 1, // Increment `correct` count in UI
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
                <h2>Random Question</h2>
                {loading && <p>Loading questions...</p>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && randomQuestion ? (
                    <div className="question-item">
                        <div className="question-header">
                            <h3>{randomQuestion.question}</h3>
                        </div>
                        <p className="question-text">{randomQuestion.question}</p>

                        <form
                            className="options-list"
                            onSubmit={handleAnswerSubmit}
                        >
                            {randomQuestion.options.map((opt, index) => (
                                <div key={index} className="option-item">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${randomQuestion._id}`}
                                            value={opt}
                                            onChange={() =>
                                                handleOptionChange(opt)
                                            }
                                            disabled={!!feedback}
                                        />
                                        <strong>Option {index + 1}:</strong>{' '}
                                        {opt}
                                    </label>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="submit-answer-btn"
                                disabled={!!feedback}
                            >
                                Submit Answer
                            </button>
                        </form>

                        {feedback && (
                            <div
                                className="feedback"
                                style={{
                                    color: feedback.isCorrect
                                        ? 'green'
                                        : 'red',
                                }}
                            >
                                <p>
                                    {feedback.isCorrect
                                        ? 'Correct!'
                                        : 'Incorrect.'}{' '}
                                    The correct answer is:{' '}
                                    {feedback.correctOption}
                                </p>
                            </div>
                        )}

                        <p className="question-details">
                            <strong>Difficulty:</strong>{' '}
                            {randomQuestion.difficulty.charAt(0).toUpperCase() +
                                randomQuestion.difficulty.slice(1)}{' '}
                            | <strong>Category:</strong>{' '}
                            {randomQuestion.category.name}
                        </p>
                    </div>
                ) : (
                    <p>No unanswered questions left.</p>
                )}

                <Link to="/player-questions" className="dashboard-link">
                    <button>Back to Questions Menu</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default RandomQuestion;
