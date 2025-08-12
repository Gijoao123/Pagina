const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const box = 20;
let snake, direction, food, score, moveDelay, lastMoveTime;

function iniciarJogo() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  score = 0;
  moveDelay = 150; // tempo entre movimentos (ms)
  lastMoveTime = 0;
  gerarComida();
  atualizarPlacar();
}

function gerarComida() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
    color: `hsl(${Math.random() * 360}, 80%, 50%)`
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

function atualizar() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    atualizarPlacar();
    gerarComida();
    moveDelay = Math.max(50, moveDelay - 5);
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

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
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, box, box);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function loop(tempoAtual) {
  if (tempoAtual - lastMoveTime > moveDelay) {
    atualizar();
    desenhar();
    lastMoveTime = tempoAtual;
  }
  requestAnimationFrame(loop);
}

iniciarJogo();
requestAnimationFrame(loop);
