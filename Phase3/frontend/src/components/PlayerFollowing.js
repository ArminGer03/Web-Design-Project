import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';
import { Link } from 'react-router-dom';

function PlayerFollowing() {
    const [designers, setDesigners] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [username, setUsername] = useState('');  
    const [followSuccess, setFollowSuccess] = useState('');

    useEffect(() => {
        fetchDesigners();
    }, []);

    const fetchDesigners = async () => {
        try {
            const res = await axios.get('/view-following');
            setDesigners(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching users');
            setLoading(false);
        }
    };

    const handleFollowUser = async () => {
        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }

        try {
            const response = await axios.post('/follow-user', { username }); 

            if (response.data.success) {
                setFollowSuccess(`User "${username}" added successfully!`);
                setError('');
                setUsername(''); 
                fetchDesigners(); 
            } else {
                setError(response.data.message || 'Could not follow user');
                setFollowSuccess('');
                setUsername(''); 
                fetchDesigners(); 
            }
        } catch (err) {
            console.error(err);
            fetchDesigners();
            setError('Error following user');
        } finally {
            setUsername('');
            fetchDesigners().then(() => setDesigners(prev => [...prev]));  
        }
    };

    const handleUnfollowUser = async (username) => {
        try {
            const response = await axios.post('/unfollow-user', { username });
    
            if (response.data.success) {
                setFollowSuccess(`Unfollowed "${username}" successfully!`);
                setError('');
                fetchDesigners(); 
            } else {
                setError(response.data.message || 'Could not unfollow user');
                setFollowSuccess('');
            }
        } catch (err) {
            console.error(err);
            setError('Error unfollowing user');
            setFollowSuccess('');
        }
    };
    

    return (
        <main>
            <section className="glass questions-container">
                <h2>Follow Section</h2>
                {loading && <p>Loading Followings...</p>}
                {error && <div className="error-message">{error}</div>}
                {deleteSuccess && <div className="success-message">{deleteSuccess}</div>}
                {followSuccess && <div className="success-message">{followSuccess}</div>}

                {!loading && (
                <div className="questions-list">
                    {designers.map((des) => (
                        <div className="question-item" key={des.id}>
                            <div className="question-header">
                                <h3>{des.username}</h3>
                                <div className="question-actions">
                                    <Link to={`/player-feed/${des.username}`}>
                                        <button className="edit-btn">Feed</button>
                                    </Link>
                                    <button 
                                        className="unfollow-btn" 
                                        onClick={() => handleUnfollowUser(des.username)}
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


                <div className="follow-user-section">
                    <input
                        type="text"
                        placeholder="Enter username to follow"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleFollowUser} className="follow-button">
                        Follow
                    </button>
                </div>

                <Link to="/player-dashboard" className="dashboard-link">
                    <button>Back to Player Dashboard</button>
                </Link>
            </section>
            <ThemeSwitch />
        </main>
    );
}

export default PlayerFollowing;
