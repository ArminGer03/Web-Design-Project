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
            localStorage.removeItem('token'); 
            return <Navigate to="/login" />;
        }

 
        const userRole = decoded.role; 


        let dashboardPath = '/login';
        if (userRole === 'user') {
            dashboardPath = '/player-dashboard';
        } else if (userRole === 'designer') {
            dashboardPath = '/designer-dashboard';
        }

        const allowedPaths = [
            '/player-dashboard', '/designer-dashboard', '/questions-management',
            '/categories-management', '/leaderboard', '/player-questions',
            '/player-categories', '/answered-questions', '/random-question', '/follow'
        ];


        const currentPath = window.location.pathname;
        if (allowedPaths.includes(currentPath)) {

            if (currentPath === '/player-dashboard' && userRole !== 'user') {
                return <Navigate to={dashboardPath} />;
            }
            if (currentPath === '/designer-dashboard' && userRole !== 'designer') {
                return <Navigate to={dashboardPath} />;
            }

            return children;
        } else {

            return <Navigate to={dashboardPath} />;
        }
    } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
