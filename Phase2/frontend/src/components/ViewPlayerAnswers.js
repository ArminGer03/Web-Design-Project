import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link, useParams } from 'react-router-dom';

function ViewPlayerAnswers() {
    const [questions, setQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]); // Array to hold filtered questions and answers
    const { id } = useParams(); // Category ID

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (questions.length > 0 && id) {
            filterAnsweredData();
        }
    }, [questions, id, answeredQuestions]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const userRes = await axios.get('/api/auth/user', {
                headers: { 'x-auth-token': token },
            });

            setCurrentUser(userRes.data);
            setAnsweredQuestions(
                userRes.data.answeredQuestions.map((question, index) => ({
                    questionId: question,
                    userAnswer: userRes.data.userAnswer[index],
                }))
            );

            const questionRes = await axios.get('/api/questions?populate=category');
            setQuestions(questionRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
            setLoading(false);
        }
    };

    const filterAnsweredData = () => {
        // Filter questions based on category ID and answered questions
        const filteredQuestions = questions.filter((q) =>
            answeredQuestions.some((aq) => aq.questionId === q._id) && q.category._id === id
        );

        // Synchronize user answers with the filtered questions
        const filteredAnswers = filteredQuestions.map((q) =>
            answeredQuestions.find((aq) => aq.questionId === q._id)
        );

        setFilteredData(filteredQuestions.map((q, index) => ({
            question: q,
            userAnswer: filteredAnswers[index]?.userAnswer || null,
        })));
    };

    return (
        <main>
            <section className="glass questions-container">
                <h2>Answered Questions</h2>
                {loading && <p>Loading answered questions...</p>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && (
                    <div className="questions-list">
                        {filteredData.map(({ question, userAnswer }) => {
                            const userAnswerIndex = userAnswer - 1;
                            const isCorrect =
                                userAnswerIndex === question.correctOption - 1;
                            const userAnswerText = userAnswerIndex >= 0
                                ? question.options[userAnswerIndex]
                                : null;

                            return (
                                <div className="question-item" key={question._id}>
                                    <div className="question-header">
                                        <h3>{question.question}</h3>
                                    </div>
                                    <p className="question-text">{question.question}</p>

                                    <div className="options-list">
                                        {question.options.map((opt, index) => (
                                            <div
                                                key={index}
                                                className={`option-item ${
                                                    index === question.correctOption - 1
                                                        ? 'correct-answer'
                                                        : ''
                                                }`}
                                                style={{
                                                    color:
                                                        userAnswerIndex === index
                                                            ? isCorrect
                                                                ? 'green'
                                                                : 'red'
                                                            : 'inherit',
                                                }}
                                            >
                                                <strong>Option {index + 1}:</strong> {opt}
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="feedback"
                                        style={{
                                            color: isCorrect ? 'green' : 'red',
                                        }}
                                    >
                                        <p>
                                            Your Answer:{' '}
                                            {userAnswerText || 'No Answer Submitted'}
                                        </p>
                                        {!isCorrect && (
                                            <p>
                                                Correct Answer:{' '}
                                                {question.options[
                                                    question.correctOption - 1
                                                ]}
                                            </p>
                                        )}
                                    </div>

                                    <p className="question-details">
                                        <strong>Difficulty:</strong>{' '}
                                        {question.difficulty.charAt(0).toUpperCase() +
                                            question.difficulty.slice(1)}{' '}
                                        | <strong>Category:</strong> {question.category.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}

                <Link to="/answered-questions" className="dashboard-link">
                    <button>Back to Questions Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default ViewPlayerAnswers;
