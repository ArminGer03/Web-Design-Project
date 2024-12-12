import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    const { name, description } = formData;

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`/api/categories/${id}`); // Using proxy
            setFormData({
                name: res.data.name,
                description: res.data.description,
            });
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching category');
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate input
        if (!name.trim()) {
            setError('Category name is required');
            return;
        }

        const updatedCategory = {
            name: name.trim(),
            description: description.trim(),
        };

        try {
            const res = await axios.put(`/api/categories/${id}`, updatedCategory); // Using proxy
            setSuccess('Category updated successfully!');
            // Optionally, redirect to view categories after a delay
            setTimeout(() => navigate('/view-categories'), 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || 'Error updating category');
        }
    };

    return (
        <main>
            <section className="glass form-container">
                <h2>Edit Category</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form onSubmit={onSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <div className="input-box">
                            <label htmlFor="name">Category Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows="4"
                                value={description}
                                onChange={onChange}
                            ></textarea>
                        </div>
                        <button type="submit">Update Category</button>
                    </form>
                )}
                <Link to="/view-categories" className="dashboard-link">
                    <button>Back to Categories Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default EditCategory;
