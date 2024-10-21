const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let direction = { x: 10, y: 0 };
let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
let score = 0;
let speed = 100;
let isGameOver = false;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  if (isGameOver) {
    alert("Game Over! Your score: " + score);
    resetGame();
    return;
  }
  setTimeout(() => {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
    gameLoop();
  }, speed);
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, 10, 10);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10,
    };
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  if (keyPressed === 37 && direction.x === 0) {
    direction = { x: -10, y: 0 }; // Left arrow key
  } else if (keyPressed === 38 && direction.y === 0) {
    direction = { x: 0, y: -10 }; // Up arrow key
  } else if (keyPressed === 39 && direction.x === 0) {
    direction = { x: 10, y: 0 }; // Right arrow key
  } else if (keyPressed === 40 && direction.y === 0) {
    direction = { x: 0, y: 10 }; // Down arrow key
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    isGameOver = true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      isGameOver = true;
    }
  }
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 10, y: 0 };
  food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
  score = 0;
  isGameOver = false;
  speed = 100;
}

gameLoop();
