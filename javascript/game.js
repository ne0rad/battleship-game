import { renderMenu } from "./DOM/renderMenu.js";
import { player } from './factories/player.js';
import { menuSwitch } from './modules/menuSwitch.js';

let timeout = false;

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

function hit(x, y) {
    if (!checkHit(playerTwo, x, y) || timeout) return;

    if (playerTwo.hit(x, y)) {
        gameover();
    } else {
        timeout = true;
        setTimeout(() => {
            cpuHit();
            timeout = false;
        }, 1000)
    }
}

function cpuHit() {
    const availableLoc = [];
    playerOne.getAvailableLoc().forEach(loc => {
        let tempLoc = loc.split('.');
        availableLoc.push([tempLoc[0], tempLoc[1]]);
    });
    let rand = Math.floor(Math.random() * availableLoc.length);
    if (playerOne.hit(availableLoc[rand][0], availableLoc[rand][1])) {
        gameover();
    }
}

function checkHit(player, x, y) {
    if (player.getAvailableLoc().indexOf(`${x}.${y}`) === -1) return false;
    else return true;
}

function gameover() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            let square = document.getElementById(`2_${j}.${i}`);
            square.classList.remove('clickable');
        }
    }
    playerOne.toggleClickable();
    playerTwo.toggleClickable();
}

function addBoardEvents() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            let square = document.getElementById(`2_${j}.${i}`);
            square.classList.add('clickable');
            square.addEventListener('click', () => hit(j, i));
        }
    }
}

function addMenuEvents() {
    document.getElementById('About')
        .addEventListener('click', () => menuSwitch('About'));
    document.getElementById('Rules')
        .addEventListener('click', () => menuSwitch('Rules'));
}

renderMenu();

let playerOne = player(1, shipsOne);
let playerTwo = player(2, shipsTwo);
addBoardEvents();

addMenuEvents();
