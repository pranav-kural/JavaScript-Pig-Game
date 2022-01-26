'use strict';

// declare and initialize variables
let current_player = 0;
let current_score = 0;
let player_scores = [];
player_scores[0] = 0;
player_scores[1] = 0;

// get elements
const PLAYER_SCORE = [];
PLAYER_SCORE[0] = document.querySelector('#score--0');
PLAYER_SCORE[1] = document.querySelector('#score--1');
const CURRENT_SCORE = [];
CURRENT_SCORE[0] = document.querySelector('#current--0');
CURRENT_SCORE[1] = document.querySelector('#current--1');
const PLAYER_SECTION = [];
PLAYER_SECTION[0] = document.querySelector('.player--0');
PLAYER_SECTION[1] = document.querySelector('.player--1');
const DICE_EL = document.querySelector('.dice');
const BTN_NEW = document.querySelector('.btn--new');
const BTN_ROLL = document.querySelector('.btn--roll');
const BTN_HOLD = document.querySelector('.btn--hold');

// update current score
function updateCurrentScore(roll_value) {
    current_score = roll_value ? current_score + roll_value : 0;
    CURRENT_SCORE[current_player].textContent = current_score;
}

// switch current player
function switchCurrentPlayer() {
    // remove player--active from current player
    PLAYER_SECTION[current_player].classList.remove('player--active');
    // switch current player
    current_player = current_player === 0 ? 1 : 0;
    // add player--active to new current player
    PLAYER_SECTION[current_player].classList.add('player--active');
    
}

// game over once a play wins
function gameOver() {
    // hide the dice
    DICE_EL.classList.add('hidden');
    // update message to show current player has won
    // hide roll dice and hold buttons
    BTN_ROLL.classList.add('hidden');
    BTN_HOLD.classList.add('hidden');
}

// hold button event handler
BTN_HOLD.addEventListener('click', () => {
    player_scores[current_player] += current_score;
    // update DOM
    PLAYER_SCORE[current_player].textContent = player_scores[current_player];
    updateCurrentScore(0);
    switchCurrentPlayer();
});

// event handler for rolling the dice
BTN_ROLL.addEventListener('click', () => {
    // get random dice value
    const roll_value = Math.trunc(Math.random() * 6) +1;
    // display the dice value
    DICE_EL.classList.remove('hidden');
    DICE_EL.src = `assets/dice-${roll_value}.png`;

    // if roll value is not 1: update the current score, 
    //                         if score 100 after update, player wins, game over
    if (roll_value !== 1) {
        updateCurrentScore(roll_value);
    } else if (roll_value === 1) {
        // clear out current score
        updateCurrentScore(0);
        // switch current player
        switchCurrentPlayer();
    }
});