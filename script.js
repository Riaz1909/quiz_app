// Array of quiz questions and answers
const questions = [   // Question 1
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {   // Question 2
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hot Mail", correct: false },
            { text: "How to Make Lasagna", correct: false },
            { text: "None of the above", correct: false }
        ]
    }
];

// Getting references to elements in the HTML
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');

// Initial score and question index
let currentQuestionIndex = 0;
let score = 0;

// Starts the quiz from the beginning
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion(); // show the first question
}

// Displays the current question and its answers
function showQuestion() {
    resetState(); // Clear previous answers and score
    let currentQuestion = questions[currentQuestionIndex]; // Get current question
    let questionNo = currentQuestionIndex + 1;
    questionContainer.innerHTML = questionNo + ". " + currentQuestion.question;

    // Create a button for each answer option
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text; // Button text
        button.classList.add('btn'); // Add a CSS class
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Store if correct
        }
        button.addEventListener('click', selectAnswer); // Handle answer click
        answerButtons.appendChild(button); // Add to the page
    });
}

// Clears previous question data and hides next button
function resetState() {
    nextButton.style.display = 'none';
    answerButtons.innerHTML = ''; // Clear previous answer buttons
    scoreContainer.innerHTML = ''; // Clear score message
}

// Handles user's answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct'); // Green for correct
        score++; // Increase score
    } else {
        selectedBtn.classList.add('wrong'); // Red for wrong
    }

    // Highlight the correct answer and disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true; // Prevent more clicks
    });
    nextButton.style.display = 'inline-block'; // Show Next button
}

// Displays the final score
function showScore() {
    resetState(); // Clear UI
    questionContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

// Handles when the "Next" button is clicked
function handleNextButton() {
    currentQuestionIndex++; // Go to next question
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore(); // If no more questions, show score
        nextButton.innerHTML = 'Restart'; // Change button to restart
    }
}

// Attach event listener to "Next" button
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart the quiz if it ended
    }
});

// Start the quiz for the first time
startQuiz();
