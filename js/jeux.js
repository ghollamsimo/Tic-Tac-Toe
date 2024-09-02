

let player_turn = 'x';
let first_player = '';
let second_player = '';
let scoreX = 0;
let scoreO = 0;

const gridSize = 20;
const winCondition = 5;
const cells = Array(gridSize * gridSize).fill('');

const playersData = JSON.parse(localStorage.getItem('players'));
const playerOne = document.getElementById('player_one');
const playerTwo = document.getElementById('player_two');

if (playersData && playersData.length > 0) {
    first_player = playersData[0].first_player;
    second_player = playersData[0].second_player;
    playerOne.innerHTML = 'Player X: ' + first_player;
    playerTwo.innerHTML = 'Player O: ' + second_player;
} else {
    console.log('No player data found in localStorage.');
}




function validation_form() {
    document.getElementById('form').addEventListener('submit', function (event) {
        const player_regex = /^[a-zA-Z]+$/;
        first_player = document.getElementById('player_one').value;
        second_player = document.getElementById('player_two').value;
        let isValid = true;

        if (!player_regex.test(first_player)) {
            const error = document.getElementById('error_message');
            error.innerHTML = "You need to enter the name of player one!";
            isValid = false;
            event.preventDefault();

        }

        if (!player_regex.test(second_player)) {
            const error = document.getElementById('error_message_two');
            error.innerHTML = "You need to enter the name of player two!";
            isValid = false;
            event.preventDefault();

        }

        if (isValid) {
            saveLocalStorage();
        }

    })
}

const cell_selector = document.querySelector('.row');
for (let i = 1; i <= 400; i++) {
    const create_cell = document.createElement('div');
    create_cell.className = 'cell';
    create_cell.setAttribute('data-cell-index', i);
    create_cell.addEventListener('click', handleClick);

    cell_selector.appendChild(create_cell);
}

function saveLocalStorage() {
    first_player = document.getElementById('player_one').value;
    second_player = document.getElementById('player_two').value;

    const existingData = JSON.parse(localStorage.getItem('players')) || [];

    const newEntry = {
        'first_player': first_player,
        'second_player': second_player,
        'winner': first_player ? first_player : second_player,
        'first_player_score': scoreX,
        'second_player_score': scoreO,
    };

    existingData.push(newEntry);
    localStorage.setItem('players', JSON.stringify(existingData));
}

function handleClick(e) {
    let clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index')) - 1;

    if (cells[cellIndex] === '') {
        cells[cellIndex] = player_turn;
        clickedCell.textContent = player_turn;

        if (checkRowWin(cellIndex) || checkColumnWin(cellIndex) || checkLeftWin() || checkRightWin()) {
            winning();
        } else {
            player_turn = player_turn === 'x' ? 'o' : 'x';
        }
    }
}

function checkRowWin(cellIndex) {
    const rowStart = Math.floor(cellIndex / gridSize) * gridSize;
    let count = 0;

    for (let i = rowStart; i < rowStart + gridSize; i++) {
        if (cells[i] === player_turn) {
            count++;
            if (count === winCondition) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function checkColumnWin(cellIndex) {
    const columnStart = cellIndex % gridSize;
    let count = 0;

    for (let i = columnStart; i < cells.length; i += gridSize) {
        if (cells[i] === player_turn) {
            count++;
            if (count === winCondition) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function checkLeftWin() {
    let count = 0;
    for (let i = 0; i <= cells.length - gridSize * winCondition; i++) {
        count = 0;
        for (let j = 0; j < winCondition; j++) {
            if (cells[i + j * (gridSize + 1)] === player_turn) {
                count++;
            } else {
                break;
            }
        }
        if (count === winCondition) {
            return true;
        }
    }
    return false;
}

function checkRightWin() {
    let count = 0;
    for (let i = winCondition - 1; i <= cells.length - gridSize * winCondition; i++) {
        count = 0;
        for (let j = 0; j < winCondition; j++) {
            if (cells[i + j * (gridSize - 1)] === player_turn) {
                count++;
            } else {
                break;
            }
        }
        if (count === winCondition) {
            return true;
        }
    }
    return false;
}

function checkScore() {
    const winner = document.getElementById('winner');
    const scorePlayerOne = document.getElementById('scorePlayerOne');
    const scorePlayerTwo = document.getElementById('scorePlayerTwo');

    if (player_turn === 'x') {
        scoreX += 1;
    } else if (player_turn === 'o') {
        scoreO += 1;
    }

    if (scoreX > scoreO) {
        winner.textContent = 'Player X wins!';
    } else if (scoreO > scoreX) {
        winner.textContent = 'Player O wins!';
    } else {
        winner.textContent = 'It\'s a draw!';
    }

    scorePlayerOne.innerHTML = `${scoreX}`;
    scorePlayerTwo.innerHTML = `${scoreO}`;
}

function winning() {
    const popup = document.getElementById('overlay');
    const playAgainButton = document.getElementById('playAgain');

    checkScore();

    popup.style.display = 'block';
    popup.style.visibility = 'visible';
    popup.style.opacity = '100';

    playAgainButton.removeEventListener('click', resetGame);

    playAgainButton.addEventListener('click', function handleClick() {
        resetGame();
        playAgainButton.removeEventListener('click', handleClick);
    });
}

function resetGame() {
    const popup = document.getElementById('overlay');

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    cells.fill('');
    player_turn = 'x';

    popup.style.display = 'none';
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
}


