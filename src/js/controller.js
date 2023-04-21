'use strict';

import '../sass/main.scss';

import { Gameboard } from './gameboard';
import { renderBoard, renderBoardAI } from './view';

const alreadyHIT = [];
const alreadyHITbyPlayer = [];

const game = Gameboard();
// console.log(game.board);
game.placeShip([0, 0], [0, 1], 2);
game.placeShip([2, 0], [7, 0], 5);
game.placeShip([8, 6], [8, 8], 3);
game.placeShip([8, 1], [8, 3], 3);
game.placeShip([2, 6], [5, 6], 4);

const gameAI = Gameboard();
gameAI.placeShip([1, 1], [5, 1], 5);
gameAI.placeShip([3, 3], [3, 6], 3);
gameAI.placeShip([5, 5], [5, 8], 3);
gameAI.placeShip([5, 3], [8, 3], 4);
gameAI.placeShip([1, 7], [1, 8], 2);

renderBoard(game.board);
renderBoardAI(gameAI.board);

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
      renderBoardAI(gameAI.board);
      attackFromAI();
      renderBoard(game.board);
    }
  });
}

play();
