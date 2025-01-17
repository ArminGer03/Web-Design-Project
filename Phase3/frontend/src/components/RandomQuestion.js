import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router-dom';

function RandomQuestion() {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const questionRes = await axios.get('/answer-random');
            setRandomQuestion(questionRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
            setLoading(false);
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
            // Update score, `correct`, and userAnswer fields
            const updateData = {
                questionId: question.id,
                points,
                userAnswer: question.options.indexOf(selectedAnswer) + 1, // Record user's answer as its index + 1
            };
            if (isCorrect) {
                updateData.incrementCorrect = 1; // Indicate `correct` increment
            }
    
            await axios.post('/update-score', updateData);
    
            setAnsweredQuestions((prev) => [...prev, question._id]);
    
            
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
