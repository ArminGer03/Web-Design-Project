import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PlayerDashboard from './components/PlayerDashboard';
import PlayerQuestions from './components/PlayerQuestions';
import DesignerDashboard from './components/DesignerDashboard';
import QuestionsManagement from './components/QuestionsManagement';
import CreateQuestion from './components/CreateQuestion';
import ViewQuestions from './components/ViewQuestions';
import EditQuestion from './components/EditQuestion';
import PlayerCategories from './components/PlayerCategories';
import CategoriesManagement from './components/CategoriesManagement';
import CreateCategory from './components/CreateCategory';
import ViewCategories from './components/ViewCategories';
import ViewPlayerAnswersCategory from './components/ViewPlayerAnswersCategory';
import ViewPlayerAnswers from './components/ViewPlayerAnswers';
import RandomQuestion from './components/RandomQuestion';
import EditCategory from './components/EditCategory';
import Leaderboard from './components/Leaderboard';
import PlayerFollowing from './components/PlayerFollowing';
import AnswerQuestions from './components/AnswerQuestions';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import PlayerFeed from './components/PlayerFeed';


function App() {
    return (
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
                            path="/answer-questions/:id"
                            element={
                                <AnswerQuestions />
                            }
                        />

                        <Route
                            path="view-answered-questions/:id"
                            element={
                                <ViewPlayerAnswers/>
                            }
                        />

                        <Route
                            path="/player-questions"
                            element={
                                <ProtectedRoute>
                                    <PlayerQuestions />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/follow"
                            element={
                                <ProtectedRoute>
                                    <PlayerFollowing />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/answered-questions"
                            element={
                                <ProtectedRoute>
                                    <ViewPlayerAnswersCategory />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/player-categories"
                            element={
                                <ProtectedRoute>
                                    <PlayerCategories />
                                </ProtectedRoute>
                            }
                        />  

                        <Route
                            path="/random-question"
                            element={
                                <ProtectedRoute>
                                    <RandomQuestion />
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
                            path="/create-question"
                            element={
                                <CreateQuestion />
                            }
                        />
                        <Route
                            path="/view-questions"
                            element={
                                    <ViewQuestions />
                            }
                        />
                        <Route
                            path="/edit-question/:id"
                            element={
                                <EditQuestion />
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
                            path="/create-category"
                            element={
                                <CreateCategory />
                            }
                        />
                        <Route
                            path="/view-categories"
                            element={
                                <ViewCategories />
                            }
                        />
                        <Route
                            path="/edit-category/:id"
                            element={
                                <EditCategory />
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
                        <Route
                            path="/player-feed/:id"
                            element={
                                
                                    <PlayerFeed />
                                
                            }
                        />


                        
                        
                        {/* Catch-all Route */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </ThemeProvider>
    );
}

export default App;