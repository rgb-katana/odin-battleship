'use strict';

const boardElement = document.querySelector('.app__field');
const boardElementAI = document.querySelector('.app__fieldAI');

export function renderBoardInitial(board, AI = false) {
  if (!AI) {
    boardElement.innerHTML = '';
    let rowNum = 0;
    for (const row of board) {
      let cellNum = 0;
      for (const cell of row) {
        const newCell = document.createElement('div');
        newCell.classList.add('app__cell');
        newCell.dataset.coords = [rowNum, cellNum];
        newCell.innerText = `${rowNum}, ${cellNum}`;
        boardElement.appendChild(newCell);
        cellNum++;
      }
      rowNum++;
    }
  }
  boardElementAI.innerHTML = '';
  let rowNum = 0;
  for (const row of board) {
    let cellNum = 0;
    for (const cell of row) {
      const newCell = document.createElement('div');
      newCell.classList.add('app__cell');
      newCell.dataset.coords = [rowNum, cellNum];
      newCell.innerText = `${rowNum}, ${cellNum}`;
      boardElementAI.appendChild(newCell);
      cellNum++;
    }
    rowNum++;
  }
}

export function renderBoard(board) {
  boardElement.innerHTML = '';
  let rowNum = 0;
  for (const row of board) {
    let cellNum = 0;
    for (const cell of row) {
      const newCell = document.createElement('div');
      newCell.classList.add('app__cell');
      newCell.dataset.coords = [rowNum, cellNum];
      switch (cell) {
        case 0:
          boardElement.appendChild(newCell);
          break;
        case 'N':
          newCell.classList.add('app__cell--ship');
          newCell.innerText = 'N';
          boardElement.appendChild(newCell);
          break;
        case 'M':
          newCell.classList.add('app__cell--miss');
          newCell.innerText = 'M';
          boardElement.appendChild(newCell);
          break;
        case 'H':
          newCell.classList.add('app__cell--hit');
          newCell.innerText = 'H';
          boardElement.appendChild(newCell);
          break;
      }
      cellNum++;
    }
    rowNum++;
  }
}

export function renderBoardAI(board) {
  boardElementAI.innerHTML = '';
  // console.log(board);
  let rowNum = 0;
  for (const row of board) {
    let cellNum = 0;
    for (const cell of row) {
      const newCell = document.createElement('div');
      newCell.classList.add('app__cellAI');
      newCell.dataset.coords = [rowNum, cellNum];
      switch (cell) {
        case 0:
          boardElementAI.appendChild(newCell);
          break;
        case 'N':
          newCell.innerText = 'N';
          boardElementAI.appendChild(newCell);
          break;
        case 'M':
          newCell.classList.add('app__cellAI--miss');
          newCell.innerText = 'M';
          boardElementAI.appendChild(newCell);
          break;
        case 'H':
          newCell.classList.add('app__cellAI--hit');
          newCell.innerText = 'H';
          boardElementAI.appendChild(newCell);
          break;
      }
      cellNum++;
    }
    rowNum++;
  }
}
