class Player {
	constructor(name, gameboard) {
		this.name = name;
		this.gameboard = gameboard;
		this.turn = false;
	}

	toggleTurn() {
		this.turn = !this.turn;
	}

	fire(opponentGameboard, x, y) {
		if (!this.turn) return false;
		return opponentGameboard.receiveAttack(x, y);
	}
}

export default Player;
