import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';

function CreateCategory() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { name, description } = formData;

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

        const newCategory = {
            name: name.trim(),
            description: description.trim(),
        };

        try {
            const res = await axios.post('/create-category', newCategory); // Using proxy
            console.log(res)
            setSuccess('Category created successfully!');
            // Optionally, reset form
            setFormData({
                name: '',
                description: '',
            });
            // Redirect to view categories after a delay
            setTimeout(() => navigate('/view-categories'), 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || 'Error creating category');
        }
    };

    return (
        <main>
            <section className="glass form-container">
                <h2>Create a New Category</h2>
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
                    <button type="submit">Create Category</button>
                </form>
                <Link to="/categories-management" className="dashboard-link">
                    <button>Back to Categories Management</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default CreateCategory;
