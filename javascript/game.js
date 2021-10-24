import { renderMenu } from "./DOM/renderMenu.js";
import { player } from './factories/player.js';

renderMenu();

let shipsOne = [
    {
        x: 1,
        y: 1,
        shipLength: 3,
        isVertical: false
    },
    {
        x: 5,
        y: 4,
        shipLength: 4,
        isVertical: true
    }
];

let shipsTwo = [
    {
        x: 3,
        y: 3,
        shipLength: 3,
        isVertical: false
    },
    {
        x: 3,
        y: 6,
        shipLength: 4,
        isVertical: true
    }
];

let playerOne = player(1, shipsOne);
let playerTwo = player(2, shipsTwo);


