let gameMode = '';
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

function selectMode(mode) {
    gameMode = mode;
    gameActive = true;
    board.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    document.getElementById('game-mode').classList.add('hidden');
    status.textContent = 'X\'in Sırası';
    initGame();
}

function initGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    if (!gameActive) return;
    
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);
    
    if (gameBoard[index] !== '') return;
    
    makeMove(index);
    
    if (gameMode === 'bot' && gameActive && currentPlayer === 'O') {
        setTimeout(makeBotMove, 500);
    }
}

function makeMove(index) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    
    if (checkWin()) {
        status.textContent = `${currentPlayer} Kazandı!`;
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        status.textContent = 'Berabere!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'in Sırası`;
}

function makeBotMove() {
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
    
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winConditions.some(condition => {
        return condition.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = 'X\'in Sırası';
    cells.forEach(cell => cell.textContent = '');
    initGame();
});
