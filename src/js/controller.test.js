import { Ship } from './controller';

test('Hitting 1 time', () => {
  const carrier = Ship(5);
  if (carrier.numOfHits === 0) {
    carrier.hit();
    expect(carrier.numOfHits).toBe(1);
  }
});

test('Sinking the ship with length 5', () => {
  const carrier = Ship(5);
  for (let i = 0; i < 4; i++) {
    carrier.hit();
    carrier.isSunk();
    expect(carrier.isSunkBool).toBe(false);
  }
  carrier.hit();
  carrier.isSunk();
  expect(carrier.isSunkBool).toBe(true);
});

test('Sinking the ship with length 3', () => {
  const carrier = Ship(3);
  for (let i = 0; i < 2; i++) {
    carrier.hit();
    carrier.isSunk();
    expect(carrier.isSunkBool).toBe(false);
  }
  carrier.hit();
  carrier.isSunk();
  expect(carrier.isSunkBool).toBe(true);
});
