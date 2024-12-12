import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PlayerDashboard from './components/PlayerDashboard';
import DesignerDashboard from './components/DesignerDashboard';
import QuestionsManagement from './components/QuestionsManagement';
import CategoriesManagement from './components/CategoriesManagement';
import Leaderboard from './components/Leaderboard';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        
                        {/* Protected Routes */}
                        <Route
                            path="/player-dashboard"
                            element={
                                <ProtectedRoute>
                                    <PlayerDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/designer-dashboard"
                            element={
                                <ProtectedRoute>
                                    <DesignerDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/questions-management"
                            element={
                                <ProtectedRoute>
                                    <QuestionsManagement />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/categories-management"
                            element={
                                <ProtectedRoute>
                                    <CategoriesManagement />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/leaderboard"
                            element={
                                <ProtectedRoute>
                                    <Leaderboard />
                                </ProtectedRoute>
                            }
                        />
                        
                        {/* Catch-all Route */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;