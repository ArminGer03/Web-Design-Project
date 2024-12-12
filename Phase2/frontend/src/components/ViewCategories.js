import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router-dom';

function ViewCategories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories'); // Using proxy
            setCategories(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching categories');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`/api/categories/${id}`); // Using proxy
                setDeleteSuccess('Category deleted successfully!');
                // Refresh the list
                fetchCategories();
                // Remove the success message after 3 seconds
                setTimeout(() => setDeleteSuccess(''), 3000);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.msg || 'Error deleting category');
            }
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
                            <div className="question-item" key={cat._id}>
                                <div className="question-header">
                                    <h3>{cat.name}</h3>
                                    <div className="question-actions">
                                        <Link to={`/edit-category/${cat._id}`}>
                                            <button className="edit-btn">Edit</button>
                                        </Link>
                                        <button className="delete-btn" onClick={() => handleDelete(cat._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="question-text">{cat.description || 'No description provided.'}</p>
                                <p className="question-details">
                                    <strong>Created At:</strong> {new Date(cat.createdAt).toLocaleString()} |{' '}
                                    <strong>Updated At:</strong> {new Date(cat.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <Link to="/categories-management" className="dashboard-link">
                    <button>Back to Categories Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default ViewCategories;
