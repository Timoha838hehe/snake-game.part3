class Snake {
  constructor() {
    this.segments = [
      [0, 0]
    ];
    this.direction = 'right'; // можливі значення: 'up', 'down', 'left', 'right'
  }

  move() {
    // Реалізація руху змійки
  }
}

class GameStats {
  constructor() {
    this.snakeLength = 1;
    this.freeCells = 99; // 100 - initial snake length
    this.difficultyLevel = 'Easy'; // можна змінювати рівень складності
    this.timeElapsed = 0; // Час з початку гри у секундах
  }

  updateFreeCells() {
    this.freeCells = 100 - this.snakeLength;
  }

  updateTime() {
    this.timeElapsed += 1;
  }
}

function updateTimer(stats) {
  stats.updateTime();
  document.getElementById('timer').innerText = `Time: ${stats.timeElapsed}s`;
}

function initGameBoard() {
  const gameBoard = document.getElementById('game-board');

  // Створити 10x10 сітку
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }
}

function placeSnake(snake) {
  const cells = document.querySelectorAll('.cell');
  snake.segments.forEach(([row, col]) => {
    const index = row * 10 + col;
    cells[index].classList.add('snake');
  });
}

function generateFood(snake) {
  const cells = document.querySelectorAll('.cell');
  let foodPosition;

  do {
    foodPosition = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ];
  } while (snake.segments.some(segment => segment[0] === foodPosition[0] && segment[1] === foodPosition[1]));

  const [foodRow, foodCol] = foodPosition;
  const foodIndex = foodRow * 10 + foodCol;
  cells[foodIndex].classList.add('food');
}

function initGame() {
  initGameBoard();

  // Створити екземпляри класів
  const snake = new Snake();
  const gameStats = new GameStats();

  // Розмістити змійку на полі
  placeSnake(snake);

  // Генерація їжі
  generateFood(snake);

  // Оновити інформацію про гру на сторінці
  document.getElementById('snake-length').innerText = `Snake Length: ${gameStats.snakeLength}`;
  document.getElementById('free-cells').innerText = `Free Cells: ${gameStats.freeCells}`;
  document.getElementById('difficulty-level').innerText = `Difficulty Level: ${gameStats.difficultyLevel}`;

  // Запустити таймер
  setInterval(() => updateTimer(gameStats), 1000);
}

// Ініціалізувати гру при завантаженні сторінки
window.onload = initGame;
