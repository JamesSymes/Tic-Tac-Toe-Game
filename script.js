// Get references to the HTML elements
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');
const gameStatus = document.getElementById('game-status');

// Initialize the game state
let currentPlayer = 'X';
let gameEnded = false;
let board = ['', '', '', '', '', '', '', '', ''];

// Function to check if the game is over
function checkGameEnded() {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        if (board[i] && board[i] === board[i + 1] && board[i] === board[i + 2]) {
            return board[i];
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
            return board[i];
        }
    }
    // Check diagonals
    if (board[0] && board[0] === board[4] && board[0] === board[8]) {
        return board[0];
    }
    if (board[2] && board[2] === board[4] && board[2] === board[6]) {
        return board[2];
    }
    // Check if the board is full
    if (!board.includes('')) {
        return 'tie';
    }
    return null;
}

// Function to handle cell click
function handleCellClick(e) {
    const cellIndex = e.target.id.slice(5);
    if (board[cellIndex] || gameEnded) {
        return;
    }
    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkGameEnded();
    if (winner) {
        if (winner === 'tie') {
            gameStatus.textContent = "It's a tie!";
        } else {
            gameStatus.textContent = `${winner} wins!`;
        }
        gameEnded = true;
        fireworks();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameEnded = false;
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameStatus.textContent = `${currentPlayer}'s turn`;
}

// Function to create fireworks
function fireworks() {
    const container = document.createElement('div');
    container.classList.add('fireworks-container');
    document.body.appendChild(container);

    for (let i = 0; i < 4; i++) {
        const spark = document.createElement('div');
        spark.classList.add('firework-spark');
        container.appendChild(spark);
    }

    setTimeout(() => {
        container.remove();
    }, 2000);
}

// Add event listeners to the cells and reset button
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);

// Initialize the game status message
gameStatus.textContent = `${currentPlayer}'s turn`;
