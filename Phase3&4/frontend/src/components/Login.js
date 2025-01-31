import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { jwtDecode } from 'jwt-decode';

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
            // Make the POST request to the backend
            const res = await axios.post('/login', { username, password, role });

            // Extract token from the Authorization header
            const token = res.headers['authorization'];

            // Save token to localStorage
            localStorage.setItem('token', token);

            // Decode the token to get the user role
            const decoded = jwtDecode(token.replace('Bearer ', ''));

            // Access the role from the decoded JWT
            const userRole = decoded.role;

            console.log('Decoded Role:', userRole);

            // Redirect based on role
            if (userRole === 'user') {
                navigate('/player-dashboard');
            } else if (userRole === 'designer') {
                navigate('/designer-dashboard');
            } else {
                navigate('/login'); // Default fallback
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Error logging in');
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
        </main>
    );
}

export default Login;
