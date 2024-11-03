var gameBoard = document.getElementById("gameBoard");
var startGameBtn = document.getElementById("startGame");
var snake = [{ x: 200, y: 200 }];
var snakeDirection = { x: 20, y: 0 };
var food = { x: 0, y: 0 };
var gameInterval;
var boardSize = 600;
var score = 0;

// Start Game
startGameBtn.addEventListener("click", startGame);

function startGame() {
  snake = [{ x: 200, y: 200 }];
  snakeDirection = { x: 20, y: 0 };
  score = 0; // Reset score
  updateScore();
  placeFood();
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 200);
}

function gameLoop() {
  updateSnakePosition();
  if (checkCollision()) {
    endGame();
  } else {
    if (checkFoodCollision()) {
      placeFood();
    } else {
      snake.pop(); // Remove last part if not eating food
    }
    drawGame();
  }
}

function updateSnakePosition() {
  var head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
  snake.unshift(head);
}

function placeFood() {
  do {
    food.x = Math.floor(Math.random() * (boardSize / 20)) * 20;
    food.y = Math.floor(Math.random() * (boardSize / 20)) * 20;
  } while (snake.some(function(segment) {
    return segment.x === food.x && segment.y === food.y;
  }));
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    updateScore();
    return true;
  }
  return false;
}

function checkCollision() {
  // Check wall collision
  if (snake[0].x < 0 || snake[0].x >= boardSize || snake[0].y < 0 || snake[0].y >= boardSize) {
    return true;
  }
  // Check self-collision
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return false;
}

function drawGame() {
  gameBoard.innerHTML = ""; // Clear the board
  snake.forEach(function(segment) {
    var snakeElement = document.createElement("div");
    snakeElement.style.left = segment.x + "px";
    snakeElement.style.top = segment.y + "px";
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
  var foodElement = document.createElement("div");
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "ArrowUp":
      if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -20 };
      break;
    case "ArrowDown":
      if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 20 };
      break;
    case "ArrowLeft":
      if (snakeDirection.x === 0) snakeDirection = { x: -20, y: 0 };
      break;
    case "ArrowRight":
      if (snakeDirection.x === 0) snakeDirection = { x: 20, y: 0 };
      break;
  }
});

function updateScore() {
  document.getElementById("score").textContent = "Score: " + score; // Update displayed score
}

function endGame() {
  clearInterval(gameInterval); // Stop the game loop
  alert("Game Over!");
  score = 0; // Reset the score
  updateScore(); // Update the displayed score
}
