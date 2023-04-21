"use strict";

import "../sass/main.scss";

import { Gameboard } from "./gameboard";

const game = Gameboard();
game.printBoard();
game.placeShip([0, 0], [0, 1], 2);
game.printBoard();
game.placeShip([1, 0], [6, 0], 5);
game.printBoard();
console.log(game.ships);
game.recieveAttack([0, 0]);
game.printBoard();
game.recieveAttack([2, 2]);
game.printBoard();
game.recieveAttack([9, 9]);
game.printBoard();
game.recieveAttack([5, 0]);
game.printBoard();
console.log(game.isAllSunk());
