const questions = [
    {
        question: "¿Dónde ocurrió el desembarco de Normandía?",
        options: ["Francia", "Alemania", "Reino Unido", "Italia"],
        answer: 0
    },
    {
        question: "¿Cuándo se firmó el Tratado de Versalles?",
        options: ["1918", "1945", "1939", "1919"],
        answer: 3
    },
    {
        question: "¿Cómo se llamó la operación para invadir la Unión Soviética?",
        options: ["Operación Barbarroja", "Operación Overlord", "Operación Tercera Ola", "Operación Market Garden"],
        answer: 0
    },
    {
        question: "¿Por qué comenzó la Segunda Guerra Mundial?",
        options: ["Invasión de Polonia", "Guerra Fría", "Tratado de Versalles", "Colapso de la economía"],
        answer: 0
    },
    {
        question: "¿Dónde se firmó la rendición de Alemania?",
        options: ["Berlín", "París", "Londres", "Varsovia"],
        answer: 0
    },
    {
        question: "¿Cuándo se lanzó la bomba atómica en Hiroshima?",
        options: ["6 de agosto de 1945", "9 de agosto de 1945", "15 de agosto de 1945", "2 de septiembre de 1945"],
        answer: 0
    },
    {
        question: "¿Cómo se llamó el conflicto entre Japón y Estados Unidos?",
        options: ["Guerra del Pacífico", "Guerra de Vietnam", "Guerra Civil", "Guerra de Corea"],
        answer: 0
    },
    {
        question: "¿Por qué se formó la ONU?",
        options: ["Para prevenir guerras", "Para comerciar", "Para reconstruir Europa", "Para eliminar armas"],
        answer: 0
    },
    {
        question: "¿Dónde se realizó la Conferencia de Yalta?",
        options: ["Rusia", "Reino Unido", "Francia", "Estados Unidos"],
        answer: 0
    },
    {
        question: "¿Cuándo terminó la Segunda Guerra Mundial en Europa?",
        options: ["1944", "1945", "1946", "1947"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let lives = 5;
let timer;
let timeLeft = 10;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("time");
const livesElement = document.getElementById("lives-count");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", startGame);

function startGame() {
    lives = 5;
    currentQuestionIndex = 0;
    startButton.style.display = "none";
    updateLives();
    showNextQuestion();
}

function showNextQuestion() {
    resetTimer();
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => selectAnswer(index));
            optionsElement.appendChild(button);
        });
    } else {
        endGame("¡Felicidades! Has terminado el juego.");
    }
}

function selectAnswer(index) {
    if (index === questions[currentQuestionIndex].answer) {
        currentQuestionIndex++;
        showNextQuestion();
    } else {
        lives--;
        updateLives();
        if (lives === 0) {
            endGame("Has perdido todas tus vidas. ¡Juego terminado!");
        } else {
            showNextQuestion();
        }
    }
}

function updateLives() {
    livesElement.textContent = lives;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            lives--;
            updateLives();
            if (lives === 0) {
                endGame("Has perdido todas tus vidas. ¡Juego terminado!");
            } else {
                showNextQuestion();
            }
        }
    }, 1000);
}

function endGame(message) {
    clearInterval(timer);
    alert(message);
    startButton.style.display = "block";
}

