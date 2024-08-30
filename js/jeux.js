let first_player = '';
let second_player = '';
let users = [];
const playersData = JSON.parse(localStorage.getItem('players'));
const playerOne = document.getElementById('player_one')
const playerTwo = document.getElementById('player_two')
if (playersData && playersData.length > 0) {
      first_player = playersData[0].first_player;
      second_player = playersData[0].second_player;
      playerOne.innerHTML = first_player
      playerTwo.innerHTML = second_player
} else {
      console.log('No player data found in localStorage.');
}

function validation_form(){
document.getElementById('form').addEventListener('submit' , function(event) {
    const player_regex = /^[a-zA-Z]+$/;
    first_player = document.getElementById('player_one').value;
    second_player = document.getElementById('player_two').value;
    if (!player_regex.test(first_player)) {
        const error = document.getElementById('error_message')
        error.innerHTML = "You need to enter the name of the player one !"
        event.preventDefault();
    }

    if (!player_regex.test(second_player)) {
        const error = document.getElementById('error_message_two')
        error.innerHTML = "You need to enter the name of the player two !"
        event.preventDefault();
    }
    save_localStorage()

    document.getElementById('form').removeEventListener('submit', event);

})
}
function save_localStorage() {
    first_player = document.getElementById('player_one').value;
    second_player = document.getElementById('player_two').value;

    const saving = [{
        'first_player': first_player,
        'second_player': second_player,
        'winner': first_player ? first_player : second_player,
        'first_player_score': 0,
        'second_player_score': 0,
    }];

    localStorage.setItem('players', JSON.stringify(saving))
}

let player_turn = 'x'
function handleClick(e){
    let clickedCell = e.target
    if (clickedCell.textContent === '') {
        clickedCell.textContent = player_turn;
        player_turn = player_turn === 'x' ? 'o' : 'x';
    }

}

const cell_selector = document.querySelector('.row')
for (let i = 1; i <= 400; i++) {
    const create_cell = document.createElement('div')
    create_cell.className = 'cell'
    create_cell.setAttribute('data-cell-index', i);
    create_cell.addEventListener('click', handleClick);

    cell_selector.appendChild(create_cell)
}

const Winnig_combination = []

for (let i = 1; i <= 400; i++) {
    const combination = [];
    while (combination.length > 3){
        const random = Math.floor(Math.random() * 10)
        if (!combination.includes(random)) {
            combination.push(random);
        }
    }
    Winnig_combination.push(combination)
}


