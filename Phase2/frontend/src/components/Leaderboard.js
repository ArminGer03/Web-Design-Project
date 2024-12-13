import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/auth/leaderboard', {
                headers: { 'x-auth-token': token },
            });

            setLeaderboard(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch leaderboard');
            setLoading(false);
        }
    };

    return (
        <main>
            <section className="glass leaderboard-container">
                <h2>Leaderboard</h2>

                {loading && <p>Loading leaderboard...</p>}
                {error && <div className="error-message">{error}</div>}

                {!loading && !error && (
                    <table className="leaderboard">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player</th>
                                <th>Total Questions</th>
                                <th>Correctly Answered</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((player) => (
                                <tr
                                    key={player.rank}
                                    className={
                                        player.rank === 1
                                            ? 'first'
                                            : player.rank === 2
                                            ? 'second'
                                            : player.rank === 3
                                            ? 'third'
                                            : ''
                                    }
                                >
                                    <td>{player.rank}</td>
                                    <td>{player.username}</td>
                                    <td>{player.totalQuestions}</td>
                                    <td>{player.correct}</td>
                                    <td>{player.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <Link to="/player-dashboard" className="dashboard-link">
                    <button>Back to Dashboard</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default Leaderboard;
