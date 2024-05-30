let canvas = document.getElementById("game-board");
let context = canvas.getContext("2d");
let box = 20;
let snake = [];
snake[0] = {x: 4 * box, y: 2 * box};
snake[1] = {x: 3 * box, y: 2 * box};
snake[2] = {x: 2 * box, y: 2 * box};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for(i = 0; i < snake.length; i++) {
        context.beginPath();
        if (i === 0) {
            context.arc(snake[i].x + box/2, snake[i].y + box/2, box/2, 0, 2 * Math.PI);
        } else if (i === snake.length - 1) {
            context.arc(snake[i].x + box/2, snake[i].y + box/2, box/2, 0, 2 * Math.PI);
        } else {
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
        context.fillStyle = "green";
        context.fill();
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function drawScore() {
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText("Score: " + score, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            document.getElementById('game-over-screen').style.display = 'block';
            document.getElementById('final-score').innerText = "Final Score: " + score;
            // Reset the snake
            snake = [];
            snake[0] = {x: 4 * box, y: 2 * box};
            snake[1] = {x: 3 * box, y: 2 * box};
            snake[2] = {x: 2 * box, y: 2 * box};
            // Reset the score
            score = 0;
        }
    }

    createBG();
    createSnake();
    drawFood();
    drawScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

document.getElementById('restart-button').addEventListener('click', function() {
    document.getElementById('game-over-screen').style.display = 'none';
    snake = [];
    snake[0] = {x: 4 * box, y: 2 * box};
    snake[1] = {x: 3 * box, y: 2 * box};
    snake[2] = {x: 2 * box, y: 2 * box};
    direction = "right";
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
    score = 0;
    game = setInterval(startGame, 100);
});

let game = setInterval(startGame, 100);
