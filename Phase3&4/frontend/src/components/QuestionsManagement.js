import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';

function QuestionsManagement() {
    return (
        <main>
            <section className="glass auth-container">
                <h2>Questions Management</h2>
                <div className="dashboard-options">
                    <Link to="/create-question" className="dashboard-link">
                        <button className="dashboard-button">Create New Question</button>
                    </Link>
                    <Link to="/view-questions" className="dashboard-link">
                        <button className="dashboard-button">View All Questions</button>
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

export default QuestionsManagement;
