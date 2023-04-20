"use strict";

import "../sass/main.scss";

const ships = [];

export function Ship(length, shipCoordiantes) {
  return {
    shipCoordiantes,
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
      const shipCoordiantes = new Map();
      if (beginCoordinate[0] === endCoordinate[0]) {
        const constantCoord = beginCoordinate[0];
        let changingCoord = beginCoordinate[1];
        for (let i = 0; i < length; i++) {
          const key = [constantCoord, changingCoord];
          shipCoordiantes.set(key, "N");
          this.board[constantCoord][changingCoord++] = "N";
        }
      } else if (beginCoordinate[1] === endCoordinate[1]) {
        const constantCoord = beginCoordinate[1];
        let changingCoord = beginCoordinate[0];
        for (let i = 0; i < length; i++) {
          const key = [changingCoord, constantCoord];
          shipCoordiantes.set(key, "N");
          this.board[changingCoord++][constantCoord] = "N";
        }
      }
      ships.push(Ship(length, shipCoordiantes));
    },
    printBoard: function () {
      console.log("NEW BOARD");
      this.board.map((row) => {
        console.log(row.join(" "));
        console.log("-");
      });
    },
    recieveAttack: function (attackCoordinate) {
      const attackCoordinates = [attackCoordinate[0], attackCoordinate[1]].join(
        ""
      );
      for (let ship of ships) {
        const arrFromMap = [...ship.shipCoordiantes.keys()];
        for (const value of arrFromMap) {
          if (value.join("") === attackCoordinates) {
            console.log(ship);
            ship.numOfHits++;
            console.log(ship);
            this.board[attackCoordinate[0]][attackCoordinate[1]] = "H";
          }
        }
      }
    },
  };
}

const game = Gameboard();
game.printBoard();
game.placeShip([0, 0], [0, 1], 2);
game.printBoard();
game.placeShip([1, 0], [6, 0], 5);
game.printBoard();
console.log(ships);
game.recieveAttack([0, 0]);
game.printBoard();
