import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        user: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    // Token expired
                    localStorage.removeItem('token');
                } else {
                    setAuth({
                        token,
                        user: decoded.user,
                    });
                }
            } catch (err) {
                console.error('Invalid token', err);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token) => {
        const decoded = jwtDecode(token);
        setAuth({
            token,
            user: decoded.user,
        });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuth({
            token: null,
            user: null,
        });
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
