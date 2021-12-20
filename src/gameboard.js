class Gameboard {
	constructor(size) {
		this.size = size;
		this.board = [];
		this.ships = [];
		this.initialize();
	}

	initialize() {
		for (let x = 0; x < this.size; x += 1) {
			this.board[x] = [];
			for (let y = 0; y < this.size; y += 1) {
				this.board[x][y] = {
					ship: null,
					reserved: false,
					hit: false,
				};
			}
		}
	}

	isPlacementValid(ship, x, y) {
		const isCellValid = x >= 0 && x < this.size
			&& y >= 0 && y < this.size;
		const isInsideTheBoard = x + (ship.isHorizontal ? ship.length : 0) < this.size
			&& y + (ship.isHorizontal ? 0 : ship.length) < this.size;
		if (!isInsideTheBoard || !isCellValid) return false;
		for (let i = 0; i < ship.length; i += 1) {
			const cell = ship.isHorizontal
				? this.board[x + i][y]
				: this.board[x][y + i];
			if (cell.reserved) return false;
		}
		return true;
	}

	addShip(ship, x, y) {
		const index = this.ships.length - 1;
		for (let i = 0; i < ship.length; i += 1) {
			const cell = ship.isHorizontal
				? this.board[x + i][y]
				: this.board[x][y + i];
			cell.ship = { index, x, y };
		}
	}

	reserveCells(ship, x, y) {
		for (let i = -1; i <= (ship.isHorizontal ? ship.length : 1); i += 1) {
			for (let j = -1; j <= (ship.isHorizontal ? 1 : ship.length); j += 1) {
				if (this.board[x + i]?.[y + j]) {
					this.board[x + i][y + j].reserved = true;
				}
			}
		}
	}

	placeShip(ship, x, y) {
		if (!this.isPlacementValid(ship, x, y)) return;
		this.ships.push(ship);
		this.reserveCells(ship, x, y);
		this.addShip(ship, x, y);
	}

	receiveAttack(x, y) {
		const cell = this.board[x]?.[y];
		if (!cell || cell.hit) return false;
		if (cell.ship) {
			const ship = this.ships[cell.ship.index];
			const spot = ship.isHorizontal ? x - cell.ship.x : y - cell.ship.y;
			ship.hit(spot);
		}
		cell.hit = true;
		return true;
	}

	isEveryShipSunk() {
		return this.ships.every((ship) => ship.isSunk());
	}
}

export default Gameboard;
