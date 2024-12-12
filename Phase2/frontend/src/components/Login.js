import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import {jwtDecode} from 'jwt-decode';

function Login() {
    const { toggleTheme, theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState('');

    const { username, password, role } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { username, password, role });
            localStorage.setItem('token', res.data.token);

            // Decode token to get user role
            const decoded = jwtDecode(res.data.token);
            const userRole = decoded.user.role;

            // Redirect based on role
            if (userRole === 'user') {
                navigate('/player-dashboard');
            } else if (userRole === 'designer') {
                navigate('/designer-dashboard');
            } else {
                navigate('/login'); // Default fallback
            }
        } catch (err) {
            setError(err.response.data.msg || 'Error logging in');
        }
    };

    return (
        <main>
            <section id="login" className="glass auth-container">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-box">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <Link to="/signup">Don't have an account? Sign up</Link>
                    <button type="submit">Submit</button>
                </form>
            </section>
            <button id="theme-switch" className="glass" aria-label="Switch Theme" onClick={toggleTheme}>
                {theme === 'light' ? (
                    // Dark mode icon
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
                    </svg>
                ) : (
                    // Light mode icon
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
                    </svg>
                )}
            </button>
        </main>
    );
}

export default Login;