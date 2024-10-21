// app.js
function showDesignerDashboard() {
    fetch('designer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        });
}

function showPlayerDashboard() {
    fetch('player.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        });
}

function showCategoryManagement() {
    fetch('category.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('designer-content').innerHTML = html;
        });
}

function showQuestionManagement() {
    fetch('question.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('designer-content').innerHTML = html;
        });
}

function startAnswering() {
    // Code for players to start answering questions.
}

function viewLeaderboard() {
    fetch('leaderboard.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('player-content').innerHTML = html;
        });
}
