import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';

function CategoriesManagement() {
    return (
        <main>
            <section className="glass auth-container">
                <h2>Categories Management</h2>
                <div className="dashboard-options">
                    <Link to="/create-category" className="dashboard-link">
                        <button className="dashboard-button">Create New Category</button>
                    </Link>
                    <Link to="/view-categories" className="dashboard-link">
                        <button className="dashboard-button">View All Categories</button>
                    </Link>
                    <Link to="/designer-dashboard" className="dashboard-link">
                        <button className="dashboard-button">Back to Dashboard</button>
                    </Link>
                </div>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default CategoriesManagement;
