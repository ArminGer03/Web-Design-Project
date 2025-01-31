import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link, useParams } from 'react-router-dom';

function ViewPlayerAnswers() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Category ID

    useEffect(() => {
        fetchInitialData();
    }, []);



    const fetchInitialData = async () => {
        setLoading(true);
        try {
            console.log("holla");
        
            const questionRes = await axios.get(`/answered-questions/${id}`);
            const answerRes = await axios.get(`/user-answers/${id}`)
            console.log(questionRes);
            console.log(answerRes);
            const c = questionRes.data.map((val, idx) => ({
                question: val,
                userAnswer: answerRes.data[idx]
            }));
            console.log(c);
            setQuestions(c);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
            setLoading(false);
        }
    };


    return (
        <main>
            <section className="glass questions-container">
                <h2>Answered Questions</h2>
                {loading && <p>Loading answered questions...</p>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && (
                    <div className="questions-list">
                        {questions.map(({ question, userAnswer }) => {
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
