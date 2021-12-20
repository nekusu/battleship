import Player from '../src/player';
import Gameboard from '../src/gameboard';

test('create a new player', () => {
	const gameboard = new Gameboard(10);
	const player = new Player('John', gameboard);
	expect(player.name).toBe('John');
	expect(player.gameboard).toBe(gameboard);
});

test('toggle player turn', () => {
	const gameboard = new Gameboard(10);
	const player = new Player('John', gameboard);
	player.toggleTurn();
	expect(player.turn).toBe(true);
	player.toggleTurn();
	expect(player.turn).toBe(false);
});

test('fire a shot at the opponent\'s gameboard', () => {
	const gameboard = new Gameboard(10);
	const player = new Player('John', gameboard);
	const opponentGameboard = new Gameboard(10);
	player.toggleTurn();
	expect(player.fire(opponentGameboard, 0, 0)).toBe(true);
});

test('fire a shot in the same spot twice', () => {
	const gameboard = new Gameboard(10);
	const player = new Player('John', gameboard);
	const opponentGameboard = new Gameboard(10);
	player.toggleTurn();
	expect(player.fire(opponentGameboard, 0, 0)).toBe(true);
	expect(player.fire(opponentGameboard, 0, 0)).toBe(false);
});

test('fire on opponent\'s turn', () => {
	const gameboard = new Gameboard(10);
	const player = new Player('John', gameboard);
	expect(player.fire(gameboard, 0, 0)).toBe(false);
});
