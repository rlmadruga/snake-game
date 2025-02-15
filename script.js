let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

let direction = "right";

function createBG() {
  context.fillStyle = "#dddbeb";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#473d32";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function createFood() {
  context.fillStyle = "#403995";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(e) {
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    event.preventDefault();
    if (e.keyCode == 37 && direction !== "right") direction = "left";
    if (e.keyCode == 38 && direction !== "down") direction = "up";
    if (e.keyCode == 39 && direction !== "left") direction = "right";
    if (e.keyCode == 40 && direction !== "up") direction = "down";
  }
}

function gameStart() {
  if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if (snake[0].x < 0 * box && direction === "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if (snake[0].y < 0 * box && direction === "up") snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert("GAME OVER! :C   /n Refresh the page to RESTART!");
    }
  }

  createBG();
  createSnake();
  createFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let game = setInterval(gameStart, 100);
