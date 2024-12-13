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
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const { id } = useParams(); // Category ID

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (questions.length > 0 && id) {
            filterAnsweredQuestions();
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

    const filterAnsweredQuestions = () => {
        const filtered = questions.filter(
            (question) =>
                question.category._id === id && answeredQuestions.includes(question._id)
        );
        setFilteredQuestions(filtered);
    };

    return (
        <main>
            <section className="glass questions-container">
                <h2>Answered Questions</h2>
                {loading && <p>Loading answered questions...</p>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && (
                    <div className="questions-list">
                        {filteredQuestions.map((q) => (
                            <div className="question-item" key={q._id}>
                                <div className="question-header">
                                    <h3>{q.question}</h3>
                                </div>
                                <p className="question-text">{q.question}</p>

                                <div className="options-list">
                                    {q.options.map((opt, index) => (
                                        <div
                                            key={index}
                                            className={`option-item ${
                                                opt === q.options[q.correctOption - 1]
                                                    ? 'correct-answer'
                                                    : ''
                                            }`}
                                        >
                                            <strong>Option {index + 1}:</strong> {opt}
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="feedback"
                                    style={{ color: 'green' }}
                                >
                                    <p>
                                        Correct Answer: {q.options[q.correctOption - 1]}
                                    </p>
                                </div>

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

                <Link to="/answered-questions" className="dashboard-link">
                    <button>Back to Questions Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default ViewPlayerAnswers;
