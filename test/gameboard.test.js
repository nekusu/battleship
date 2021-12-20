import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

test('create new gameboard', () => {
	const gameboard = new Gameboard(10);
	const cells = gameboard.board
		.reduce((total, column) => total + column.length, 0);
	expect(cells).toBe(100);
});

test('place ship inside the board', () => {
	const gameboard = new Gameboard(10);
	const ship = new Ship(4);
	gameboard.placeShip(ship, 0, 0);
	expect(gameboard.board[0][0].ship).toBeTruthy();
	expect(gameboard.ships).toEqual([ship]);
});

test('place half of the ship outside the board', () => {
	const gameboard = new Gameboard(10);
	const ship = new Ship(4);
	gameboard.placeShip(ship, 0, 8);
	expect(gameboard.ships).toEqual([]);
});

test('place whole ship outside the board', () => {
	const gameboard = new Gameboard(10);
	const ship = new Ship(4);
	gameboard.placeShip(ship, 10, 10);
	expect(gameboard.ships).toEqual([]);
});

test('place intersecting ships', () => {
	const gameboard = new Gameboard(10);
	const ship1 = new Ship(4);
	const ship2 = new Ship(4, true);
	gameboard.placeShip(ship1, 2, 0);
	gameboard.placeShip(ship2, 0, 1);
	expect(gameboard.ships).toEqual([ship1]);
});

test('receive attack', () => {
	const gameboard = new Gameboard(10);
	expect(gameboard.receiveAttack(0, 0)).toBe(true);
	expect(gameboard.board[0][0].hit).toBe(true);
});

test('receive attack on ship', () => {
	const gameboard = new Gameboard(10);
	const ship = new Ship(5);
	gameboard.placeShip(ship, 0, 0);
	expect(gameboard.receiveAttack(0, 0)).toBe(true);
	expect(gameboard.board[0][0].hit).toBe(true);
});

test('receive attack outside the board', () => {
	const gameboard = new Gameboard(10);
	expect(gameboard.receiveAttack(-1, 10)).toBe(false);
	expect(gameboard.board.some((cell) => cell.hit)).toBe(false);
});

test('receive attack in the same place twice', () => {
	const gameboard = new Gameboard(10);
	expect(gameboard.receiveAttack(0, 0)).toBe(true);
	expect(gameboard.receiveAttack(0, 0)).toBe(false);
	expect(gameboard.board[0][0].hit).toBe(true);
});

test('sink one of the ships on the board', () => {
	const gameboard = new Gameboard(10);
	const ship1 = new Ship(2, true);
	const ship2 = new Ship(2, true);
	gameboard.placeShip(ship1, 0, 0);
	gameboard.placeShip(ship2, 0, 2);
	gameboard.receiveAttack(0, 0);
	gameboard.receiveAttack(1, 0);
	expect(gameboard.isEveryShipSunk()).toBe(false);
});

test('sink all the ships on the board', () => {
	const gameboard = new Gameboard(10);
	const ship1 = new Ship(2, true);
	const ship2 = new Ship(2, true);
	gameboard.placeShip(ship1, 0, 0);
	gameboard.placeShip(ship2, 0, 2);
	gameboard.receiveAttack(0, 0);
	gameboard.receiveAttack(1, 0);
	gameboard.receiveAttack(0, 2);
	gameboard.receiveAttack(1, 2);
	expect(gameboard.isEveryShipSunk()).toBe(true);
});
