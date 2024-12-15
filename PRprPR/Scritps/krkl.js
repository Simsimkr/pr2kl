const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const startGameButton = document.getElementById("startGame");
const options = document.getElementById("options");
const resultDisplay = document.getElementById("result");
const toggleSymbolButton = document.getElementById("toggleSymbol");
const toggleOpponentButton = document.getElementById("toggleOpponent");
const symbolGroup = document.getElementById("symbolGroup");

let playerSymbol = "X";
let botSymbol = "O";
let opponent = "bot";
let currentPlayer = "X";
let gameActive = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

function createBoard() {
  board.innerHTML = "";
  resultDisplay.textContent = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.dataset.symbol = "";
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.dataset.symbol = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    resultDisplay.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    resultDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  if (opponent === "bot" && currentPlayer === playerSymbol) {
    currentPlayer = botSymbol;
    setTimeout(botMove, 500); // Bot plays after a delay
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function botMove() {
  if (!gameActive) return;

  const emptyCells = [...board.children].filter(
    (cell) => cell.textContent === ""
  );
  if (emptyCells.length === 0) return;

  // Try to win or block the opponent
  const bestMove = findBestMove();
  if (bestMove !== null) {
    const cell = board.children[bestMove];
    cell.textContent = botSymbol;
    cell.dataset.symbol = botSymbol;
    cell.classList.add("taken");

    if (checkWin()) {
      resultDisplay.textContent = `${botSymbol} wins!`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      resultDisplay.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = playerSymbol;
  }
}

function findBestMove() {
  // Check for a winning move
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const values = [
      board.children[a].dataset.symbol,
      board.children[b].dataset.symbol,
      board.children[c].dataset.symbol,
    ];

    // Win
    if (
      values.filter((v) => v === botSymbol).length === 2 &&
      values.includes("")
    ) {
      return [a, b, c][values.indexOf("")];
    }

    // Block
    if (
      values.filter((v) => v === playerSymbol).length === 2 &&
      values.includes("")
    ) {
      return [a, b, c][values.indexOf("")];
    }
  }

  // Try to build a line
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const values = [
      board.children[a].dataset.symbol,
      board.children[b].dataset.symbol,
      board.children[c].dataset.symbol,
    ];

    if (
      values.filter((v) => v === botSymbol).length === 1 &&
      values.includes("") &&
      values.filter((v) => v === playerSymbol).length === 0
    ) {
      return [a, b, c][values.indexOf("")];
    }
  }

  // Otherwise, pick a random move
  const emptyCells = [...board.children]
    .map((cell, index) => (cell.dataset.symbol === "" ? index : null))
    .filter((index) => index !== null);
  return emptyCells.length > 0
    ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
    : null;
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return board.children[index].dataset.symbol === currentPlayer;
    });
  });
}

function isDraw() {
  return [...board.children].every((cell) => cell.dataset.symbol !== "");
}

resetButton.addEventListener("click", () => {
  options.style.display = "block";
  resetButton.style.display = "none";
  gameActive = false;
  createBoard();
});

startGameButton.addEventListener("click", () => {
  options.style.display = "none";
  resetButton.style.display = "block";
  startGame();
});

toggleSymbolButton.addEventListener("click", () => {
  playerSymbol = playerSymbol === "X" ? "O" : "X";
  botSymbol = playerSymbol === "X" ? "O" : "X";
  toggleSymbolButton.textContent = `Switch Symbol: ${playerSymbol}`;
});

toggleOpponentButton.addEventListener("click", () => {
  opponent = opponent === "bot" ? "player" : "bot";
  toggleOpponentButton.textContent = `Opponent: ${
    opponent === "bot" ? "Bot" : "Player"
  }`;
  symbolGroup.style.display = opponent === "bot" ? "block" : "none";
});

function startGame() {
  gameActive = true;
  createBoard();
  if (opponent === "bot" && playerSymbol === "O") {
    currentPlayer = botSymbol;
    botMove();
  } else {
    currentPlayer = "X";
  }
}

createBoard();
