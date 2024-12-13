import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';



function PlayerQuestions() {

    return (
        <main>
            <section className="glass auth-container">
                <h2>Questions Managament</h2>
                <div className="dashboard-options">
                    <Link to="/player-categories" className="dashboard-link">
                        <button className="dashboard-button">New Question</button>
                    </Link>
                    <Link to="/ViewAnsweredQuestions" className="dashboard-link">
                        <button className="dashboard-button">Answered Questions</button>
                    </Link> 
                    <Link to="/player-dashboard" className="dashboard-link">
                        <button className="dashboard-button">Back to Dashboard</button>
                    </Link> 
                </div>
            </section>

            <ThemeSwitch />
        </main>
    );
    
}


export default PlayerQuestions;