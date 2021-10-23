import { ship } from "../ship.js";
import { renderMenu } from "../../DOM/renderMenu.js";
import { renderBoard } from '../../DOM/renderBoard.js';

renderMenu();
renderBoard(1); // playerID = 1
renderBoard(2); // playerID = 2

// ship(playerID, x, y, length, isVertical)

test('Ship is destroyed at zero health', () => {
    let testShip = ship(1, 1, 1, 1, true);
    expect(testShip.hit(1, 1)).toBeFalsy();
});

test('Ship is NOT destroyed at one health', () => {
    let testShip = ship(1, 1, 1, 2, true);
    expect(testShip.hit(1, 1)).toBeTruthy();
});

test('Ship (4 length) is destroyed after 4 hits', () => {
    let testShip = ship(1, 1, 1, 4, true);
    testShip.hit(2, 1);
    testShip.hit(3, 1);
    testShip.hit(4, 1)
    expect(testShip.hit(1, 1)).toBeFalsy();
});

test('Ship (4 length) is NOT destroyed after 3 hits', () => {
    let testShip = ship(1, 1, 1, 4, true);
    testShip.hit(2, 1);
    testShip.hit(3, 1);
    expect(testShip.hit(1, 1)).toBeTruthy();
});


