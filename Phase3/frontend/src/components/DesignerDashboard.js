import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';

function DesignerDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <main>
            <section className="glass auth-container">
                <h2>Designer Dashboard</h2>
                <div className="dashboard-options">
                    <Link to="/questions-management" className="dashboard-link">
                        <button className="dashboard-button">Questions Management</button>
                    </Link>
                    <Link to="/categories-management" className="dashboard-link">
                        <button className="dashboard-button">Categories Management</button>
                    </Link>
                </div>
                <button onClick={handleLogout} className="dashboard-button" style={{ marginTop: '20px', backgroundColor: '#f03a47' }}>
                    Logout
                </button>
            </section>

            <ThemeSwitch />
        </main>
    );
}

export default DesignerDashboard;
