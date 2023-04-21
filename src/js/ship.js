"use strict";

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
