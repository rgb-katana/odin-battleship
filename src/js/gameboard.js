"use strict";

import { Ship } from "./ship";

export function Gameboard() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let i = 0; i < 10; i++) {
      row.push(0);
    }
    board.push(row);
  }

  const ships = [];

  return {
    ships,
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
      this.ships.push(Ship(length, shipCoordiantes));
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
      for (let ship of this.ships) {
        const arrFromMap = [...ship.shipCoordiantes.keys()];
        for (const value of arrFromMap) {
          if (value.join("") === attackCoordinates) {
            ship.hit();
            this.board[attackCoordinate[0]][attackCoordinate[1]] = "H";
            return;
          }
        }
      }
      this.board[attackCoordinate[0]][attackCoordinate[1]] = "M";
    },
    isAllSunk: function () {
      let flag = true;
      for (const row of this.board) {
        for (const cell of row) {
          if (cell === "N") flag = false;
        }
      }
      return flag;
    },
  };
}
