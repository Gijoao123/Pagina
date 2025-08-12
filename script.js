const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const box = 20;
let snake, direction, food, score, speed;

function iniciarJogo() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  score = 0;
  speed = 150; // velocidade inicial (ms)
  gerarComida();
  atualizarPlacar();
}

function gerarComida() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
    color: `hsl(${Math.random() * 360}, 80%, 50%)` // cor aleatória
  };
}

function atualizarPlacar() {
  scoreDisplay.textContent = `Pontuação: ${score}`;
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha comida
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, box, box);

  // Desenha cobra
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Comer comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    atualizarPlacar();
    gerarComida();
    speed = Math.max(50, speed - 5); // aumenta a velocidade
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  // Verifica colisões
  if (
    snakeX < 0 || snakeX >= canvas.width ||
    snakeY < 0 || snakeY >= canvas.height ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    alert(`Game Over! Pontuação final: ${score}`);
    iniciarJogo();
    return;
  }

  snake.unshift(newHead);

  setTimeout(desenhar, speed);
}

iniciarJogo();
desenhar();