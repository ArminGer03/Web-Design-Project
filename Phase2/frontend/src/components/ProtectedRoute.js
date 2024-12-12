import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token');
            return false;
        }
        return true;
    } catch (err) {
        console.error('Invalid token', err);
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
