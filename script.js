const startButton = document.getElementById('start-button');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverAudio = document.getElementById('game-over-audio');

let score = 0;
let timeLeft = 30;
let gameInterval, timerInterval;

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    gameOverModal.classList.add('hidden');
    startButton.disabled = true;

    gameInterval = setInterval(spawnCircle, 800); // Cada 0.8 segundos aparece un círculo
    timerInterval = setInterval(updateTimer, 1000);
}

function spawnCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const x = Math.random() * (gameArea.offsetWidth - 50);
    const y = Math.random() * (gameArea.offsetHeight - 50);

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    circle.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
        circle.remove();
    });

    gameArea.appendChild(circle);

    setTimeout(() => {
        if (gameArea.contains(circle)) {
            circle.remove();
        }
    }, 1500); // Desaparece tras 1.5 segundos
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    startButton.disabled = false;
    gameOverModal.classList.remove('hidden');
    gameOverAudio.play();
}

function restartGame() {
    gameOverModal.classList.add('hidden');
    startGame();
}

function shareGame() {
    const shareData = {
        title: 'Juego Online Mejorado',
        text: '¡Prueba este divertido juego online!',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        alert('La función de compartir no está soportada en este navegador.');
    }
}

startButton.addEventListener('click', startGame);
