import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <main>
            <section className="glass">
                <h2>Dashboard</h2>
                <p>Welcome to your dashboard!</p>
                <button onClick={handleLogout}>Logout</button>
            </section>
        </main>
    );
}

export default Dashboard;
