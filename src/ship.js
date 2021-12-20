class Ship {
	constructor(length, isHorizontal = false) {
		this.length = length;
		this.isHorizontal = isHorizontal;
		this.hits = [];
	}

	rotate() {
		this.isHorizontal = !this.isHorizontal;
	}

	hit(spot) {
		const isSpotValid = spot >= 0 && spot < this.length;
		if (!isSpotValid || this.hits.includes(spot)) return;
		this.hits.push(spot);
	}

	isSunk() {
		return this.hits.length === this.length;
	}
}

export default Ship;
