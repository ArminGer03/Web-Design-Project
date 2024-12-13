import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        }

        // Determine the user's role and navigate accordingly
        const userRole = decoded.user.role;

        // Determine the path based on role
        let dashboardPath = '/login';
        if (userRole === 'user') {
            dashboardPath = '/player-dashboard';
        } else if (userRole === 'designer') {
            dashboardPath = '/designer-dashboard';
        }

        // If the current route is a dashboard, allow access
        // Otherwise, redirect to the appropriate dashboard
        const currentPath = window.location.pathname;
        const allowedPaths = ['/player-dashboard', '/designer-dashboard', '/questions-management', '/categories-management', '/leaderboard', '/player-questions', '/player-categories', '/answered-questions', '/random-question', '/follow'];

        if (allowedPaths.includes(currentPath)) {
            // Optionally, enforce role-based access to specific routes
            if (currentPath === '/player-dashboard' && userRole !== 'user') {
                return <Navigate to={dashboardPath} />;
            }
            if (currentPath === '/designer-dashboard' && userRole !== 'designer') {
                return <Navigate to={dashboardPath} />;
            }
            // Add more role-based access controls as needed
            return children;
        } else {
            // Redirect to the appropriate dashboard
            return <Navigate to={dashboardPath} />;
        }
    } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
