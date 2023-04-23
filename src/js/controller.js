'use strict';

import '../sass/main.scss';

import { Gameboard } from './gameboard';
import { renderBoard, renderBoardAI, renderBoardInitial } from './view';

const startBtn = document.querySelector('.controls__button');

const alreadyHIT = [];
const alreadyHITbyPlayer = [];

let game = Gameboard();
// console.log(game.board);
// game.placeShip([0, 0], [0, 1], 2);
// game.placeShip([2, 0], [7, 0], 5);
// game.placeShip([8, 6], [8, 8], 3);
// game.placeShip([8, 1], [8, 3], 3);
// game.placeShip([2, 6], [5, 6], 4);

let gameAI = Gameboard();
// gameAI.placeShip([1, 1], [5, 1], 5);
// gameAI.placeShip([3, 3], [3, 6], 3);
// gameAI.placeShip([5, 5], [5, 8], 3);
// gameAI.placeShip([5, 3], [8, 3], 4);
// gameAI.placeShip([1, 7], [1, 8], 2);

// renderBoard(game.board);
renderBoardAI(gameAI.board);
renderBoardInitial(game.board);

function generateCoords() {
  const xCoord = Math.floor(Math.random() * 10);
  const yCoord = Math.floor(Math.random() * 10);
  console.log([xCoord, yCoord]);
  if (!alreadyHIT.includes([xCoord, yCoord].join(''))) {
    console.log([xCoord, yCoord]);
    return [xCoord, yCoord];
  }
  return generateCoords();
}

function attackFromAI() {
  const theHit = generateCoords();
  game.recieveAttack(theHit);
  alreadyHIT.push(theHit.join(''));
}

function finishGame() {
  console.log('The game has ended');
}

function play() {
  document.addEventListener('click', function (e) {
    // console.log(e.target);
    if (
      (e.target.classList.contains('app__cellAI') &&
        e.target.innerText === '') ||
      e.target.innerText === 'N'
    ) {
      const attackCoords = e.target.dataset.coords.split(',');
      // console.log(attackCoords);
      gameAI.recieveAttack(attackCoords);
      if (gameAI.isAllSunk()) {
        finishGame();
      }
      renderBoardAI(gameAI.board);
      attackFromAI();
      if (game.isAllSunk()) {
        finishGame();
      }
      renderBoard(game.board);
    }
  });
}

startBtn.addEventListener('click', function (e) {
  e.preventDefault();
  e.target.remove();
  document.querySelector('.controls').insertAdjacentHTML(
    'afterbegin',
    `
  <form action="#" class="form">
          <p class="form__message">
            Place your ships!<br />
            <b
              >Input the beggining coordinate and the end coordinate like this:
              0,0 0,1</b
            >
          </p>
          <div class="form__input-box">
            <input
              type="text"
              class="form__input"
              id="carrier"
              name="carrier"
              required
            />
            <label for="carrier" class="form__label"
              >Your Carrier [5 cells]</label
            >
          </div>
          <div class="form__input-box">
            <input
              type="text"
              class="form__input"
              id="battleship"
              name="battleship"
              required
            />
            <label for="battleship" class="form__label"
              >Your Battleship [4 cells]</label
            >
          </div>
          <div class="form__input-box">
            <input
              type="text"
              class="form__input"
              id="cruiser"
              name="cruiser"
              required
            />
            <label for="cruiser" class="form__label"
              >Your Cruiser [3 cells]</label
            >
          </div>
          <div class="form__input-box">
            <input
              type="text"
              class="form__input"
              id="submarine"
              name="submarine"
              required
            />
            <label for="submarine" class="form__label"
              >Your Submarine [3 cells]</label
            >
          </div>
          <div class="form__input-box">
            <input
              type="text"
              class="form__input"
              id="destroyer"
              name="destroyer"
              required
            />
            <label for="destroyer" class="form__label"
              >Your Destroyer [2 cells]</label
            >
          </div>
          <div class="form__submit">
            <button class="button__submit">Begin the battle</button>
          </div>
  `
  );
});

document.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('button__submit')) {
    const carrierCoords = document
      .querySelector('[name="carrier"]')
      .value.split(' ')
      .map(coord => coord.split(',').map(coord => parseInt(coord)));
    const battleshipCoords = document
      .querySelector('[name="battleship"]')
      .value.split(' ')
      .map(coord => coord.split(',').map(coord => parseInt(coord)));
    const destroyerCoords = document
      .querySelector('[name="destroyer"]')
      .value.split(' ')
      .map(coord => coord.split(',').map(coord => parseInt(coord)));
    const cruiserCoords = document
      .querySelector('[name="cruiser"]')
      .value.split(' ')
      .map(coord => coord.split(',').map(coord => parseInt(coord)));
    const submarineCoords = document
      .querySelector('[name="submarine"]')
      .value.split(' ')
      .map(coord => coord.split(',').map(coord => parseInt(coord)));
    game = Gameboard();
    console.log(destroyerCoords[0], destroyerCoords[1]);
    game.placeShip(destroyerCoords[0], destroyerCoords[1], 2);
    game.placeShip(carrierCoords[0], carrierCoords[1], 5);
    game.placeShip(submarineCoords[0], submarineCoords[1], 3);
    game.placeShip(cruiserCoords[0], cruiserCoords[1], 3);
    game.placeShip(battleshipCoords[0], battleshipCoords[1], 4);
    renderBoard(game.board);
    gameAI = Gameboard();
    gameAI.placeShip([1, 1], [5, 1], 5);
    gameAI.placeShip([3, 3], [3, 6], 3);
    gameAI.placeShip([5, 5], [5, 8], 3);
    gameAI.placeShip([5, 3], [8, 3], 4);
    gameAI.placeShip([1, 7], [1, 8], 2);
    renderBoardAI(gameAI.board);
    document.querySelector('.controls').innerHTML = '';
    play();
  }
});
