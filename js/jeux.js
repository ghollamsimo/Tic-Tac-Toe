const first_player = document.getElementById('player_one').value
const second_player = document.getElementById('player_two').value

function validation_form(){
document.getElementById('form').addEventListener('submit' , function(event) {
    const player_regex = /^[a-zA-Z]+$/;


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

})
    save_localStorage()
}

let winnig = true
let draw = '';
let message = '';

if (first_player || second_player === winnig){
    message = `Player ${first_player || second_player} winnig !`
}else if (first_player && second_player === draw){
    message = 'Game ended in Draw';
}

const saving = [{
    'first_player': first_player,
    'second_player': second_player,
    'winner': first_player ? first_player : second_player,
    'message': message,
    'first_player_score': 0,
    'second_player_score': 0,
}];

function save_localStorage() {
    localStorage.setItem('players', JSON.stringify(saving))
}

const cell_selector = document.querySelector('.row')
for (let i = 1; i <= 400; i++) {
    const create_cell = document.createElement('div')
    create_cell.className = 'cell'
    create_cell.setAttribute('data-cell-index', i);
    cell_selector.appendChild(create_cell)
}

const Plaayer_X_turn = 'x'
const Plaayer_O_turn = 'o'
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


