import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';

function PlayerDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <main>
            <section className="glass auth-container">
                <h2>Player Dashboard</h2>
                <div className="dashboard-options">
                    <Link to="/player-questions" className="dashboard-link">
                        <button className="dashboard-button">Questions</button>
                    </Link>
                    <Link to="/leaderboard" className="dashboard-link">
                        <button className="dashboard-button">Leaderboard</button>
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

export default PlayerDashboard;
