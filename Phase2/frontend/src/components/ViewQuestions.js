import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router-dom';

function ViewQuestions() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get('/api/questions');
            setQuestions(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching questions');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await axios.delete(`/api/questions/${id}`);
                setDeleteSuccess('Question deleted successfully!');
                // Refresh the list
                fetchQuestions();
                // Remove the success message after 3 seconds
                setTimeout(() => setDeleteSuccess(''), 3000);
            } catch (err) {
                console.error(err);
                setError('Error deleting question');
            }
        }
    };

    return (
        <main>
            <section className="glass questions-container">
                <h2>All Questions</h2>
                {loading && <p>Loading questions...</p>}
                {error && <div className="error-message">{error}</div>}
                {deleteSuccess && <div className="success-message">{deleteSuccess}</div>}
                {!loading && !error && (
                    <div className="questions-list">
                        {questions.map((q) => (
                            <div className="question-item" key={q._id}>
                                <div className="question-header">
                                    <h3>{q.question}</h3>
                                    <div className="question-actions">
                                        {/* Edit functionality can be implemented similarly */}
                                        <Link to={`/edit-question/${q._id}`}>
                                            <button className="edit-btn">Edit</button>
                                        </Link>
                                        <button className="delete-btn" onClick={() => handleDelete(q._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="question-text">{q.question}</p>
                                <ul className="options-list">
                                    {q.options.map((opt, index) => (
                                        <li key={index}>
                                            <strong>Option {index + 1}:</strong> {opt}
                                        </li>
                                    ))}
                                </ul>
                                <p className="correct-answer">
                                    <strong>Correct Answer:</strong> Option {q.correctOption}
                                </p>
                                <p className="question-details">
                                    <strong>Difficulty:</strong> {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)} |{' '}
                                    <strong>Category:</strong> {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <Link to="/questions-management" className="dashboard-link">
                    <button>Back to Questions Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default ViewQuestions;