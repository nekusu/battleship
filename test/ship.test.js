import Ship from '../src/ship';

test('create new ship', () => {
	expect(new Ship(5).length).toBe(5);
});

test('rotate ship', () => {
	const ship = new Ship(5, true);
	expect(ship.isHorizontal).toBe(true);
	ship.rotate();
	expect(ship.isHorizontal).toBe(false);
});

test('hit ship', () => {
	const ship = new Ship(4);
	ship.hit(0);
	expect(ship.hits).toEqual([0]);
});

test('hit ship in the same spot twice', () => {
	const ship = new Ship(4);
	ship.hit(0);
	ship.hit(0);
	expect(ship.hits).toEqual([0]);
});

test('hit ship in an invalid spot', () => {
	const ship = new Ship(4);
	ship.hit(4);
	expect(ship.hits).toEqual([]);
});

test('sink ship', () => {
	const ship = new Ship(3);
	ship.hit(0);
	ship.hit(1);
	ship.hit(2);
	expect(ship.isSunk()).toBe(true);
});
