// DOM INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [ /* Your 10 questions as defined above */ ];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

// Set totals
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  finalScoreSpan.textContent = 0;
  resultScreen.classList.remove("start");
  startScreen.classList.remove("start");
  quizScreen.classList.add("start");
  showQuestion();
}

// Restart the quiz
function restartQuiz() {
  resultScreen.classList.remove("start");
  startScreen.classList.add("start");
}

// Show a question
function showQuestion() {
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;

  // Update progress bar
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Render answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-button");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", (e) => handleAnswerClick(e, answer.correct));
    answersContainer.appendChild(button);
  });
}

// Handle answer click
function handleAnswerClick(e, isCorrect) {
  if (answerDisabled) return;

  answerDisabled = true;

  const clickedButton = e.target;
  if (isCorrect === true || isCorrect === "true") {
    score++;
    scoreSpan.textContent = score;
    clickedButton.classList.add("correct");
  } else {
    clickedButton.classList.add("wrong");
  }

  // Disable all buttons visually
  Array.from(answersContainer.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// Show result screen
function showResult() {
  quizScreen.classList.remove("start");
  resultScreen.classList.add("start");
  finalScoreSpan.textContent = score;

  if (score === quizQuestions.length) {
    resultMessage.textContent = "Perfect! You're a pro!";
  } else if (score >= quizQuestions.length / 2) {
    resultMessage.textContent = "Well done!";
  } else {
    resultMessage.textContent = "Keep practicing!";
  }
}
});