function displayRandomQuestion() {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 100); // Random number between 0 and 99
    
    console.log("Random Number: " + randomNumber); // For debugging
    
    // If the number is odd, show question-odd, otherwise show question-even
    if (randomNumber % 2 !== 0) {
        document.getElementById('question-odd').style.display = 'block';   // Show the odd question
        document.getElementById('question-even').style.display = 'none';   // Hide the even question
    } else {
        document.getElementById('question-even').style.display = 'block';  // Show the even question
        document.getElementById('question-odd').style.display = 'none';    // Hide the odd question
    }
}

// Call the function when the page loads
window.onload = displayRandomQuestion;