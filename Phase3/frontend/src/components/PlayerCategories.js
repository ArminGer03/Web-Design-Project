import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link, useParams } from 'react-router-dom';

function PlayerCategories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/view-categories'); // Using proxy
            setCategories(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching categories');
            setLoading(false);
        }
    };


    return (
        <main>
            <section className="glass questions-container">
                <h2>All Categories</h2>
                {loading && <p>Loading categories...</p>}
                {error && <div className="error-message">{error}</div>}
                {deleteSuccess && <div className="success-message">{deleteSuccess}</div>}
                {!loading && !error && (
                    <div className="questions-list">
                        {categories.map((cat) => (
                            <div className="question-item" key={cat.id}>
                                <div className="question-header">
                                    <h3>{cat.name}</h3>
                                    <div className="question-actions">
                                        <Link to={`/answer-questions/${cat.id}`}>
                                            <button className="edit-btn">Answer some Questions!</button>
                                        </Link>
                                    </div>
                                </div>
                                <p className="question-text">{cat.description || 'No description provided.'}</p>
                            </div>
                        ))}
                    </div>
                )}

                <Link to="/player-questions" className="dashboard-link">
                    <button>Back to Question Menu</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default PlayerCategories;
