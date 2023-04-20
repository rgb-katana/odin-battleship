'use strict';

import '../sass/main.scss';

export function Ship(length) {
  return {
    length,
    numOfHits: 0,
    isSunkBool: false,
    hit: function () {
      this.numOfHits++;
    },
    isSunk: function () {
      if (this.numOfHits === this.length) {
        this.isSunkBool = true;
      }
    },
  };
}

export function Gameboard() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let i = 0; i < 10; i++) {
      row.push(0);
    }
    board.push(row);
  }

  return {
    board,
    placeShip: function (beginCoordinate, endCoordinate, length) {
      if (beginCoordinate[0] === endCoordinate[0]) {
        const constantCoord = beginCoordinate[0];
        let changingCoord = beginCoordinate[1];
        for (let i = 0; i < length; i++) {
          this.board[constantCoord][changingCoord++] = length;
        }
      } else if (beginCoordinate[1] === endCoordinate[1]) {
        const constantCoord = beginCoordinate[1];
        let changingCoord = beginCoordinate[0];
        for (let i = 0; i < length; i++) {
          this.board[changingCoord++][constantCoord] = length;
        }
      }
    },
    printBoard: function () {
      console.log('NEW BOARD');
      this.board.map(row => {
        console.log(row.join(' '));
        console.log('-');
      });
    },
    recieveAttack: function (attackCoordinate) {
      if (this.board[attackCoordinate[0]][attackCoordinate[1]] === 0) {
        this.board[attackCoordinate[0]][attackCoordinate[1]] = 'M';
      } else if (this.board[attackCoordinate[0]][attackCoordinate[1]] !== 0) {
        this.board[attackCoordinate[0]][attackCoordinate[1]] = 'H';
      }
    },
  };
}

const game = Gameboard();
game.printBoard();
game.placeShip([0, 0], [0, 2], 2);
game.placeShip([1, 0], [6, 0], 5);
game.placeShip([5, 9], [9, 9], 5);
game.placeShip([2, 4], [7, 4], 5);
game.printBoard();
