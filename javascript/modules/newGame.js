import { renderNew } from "../DOM/renderNew.js";
import { game } from "./startGame.js";
import { randomShips } from "./randomShips.js";

function newGame() {
    let occupiedSquares = {};
    let ships = [];
    let shipQueue = [5, 4, 3, 3, 2];
    renderNew();
    let shipSelectorDiv = document.getElementById('shipSelector');
    renderTitle('Place the ship on the board (click on the ship to rotate)');
    let shipDiv = renderShipDiv();
    let shipLength;
    let isVertical;
    nextShip();
    renderRandomizeButton();
    addEvents();
    let finishedPlacing = false;

    function renderTitle(text) {
        let title = document.createElement('div');
        title.classList.add('text-title');
        title.textContent = text;
        shipSelectorDiv.appendChild(title);
    }

    function renderRandomizeButton() {
        let randomize = document.createElement('div');
        randomize.classList.add('randomize-btn');
        randomize.textContent = 'Randomize';
        randomize.addEventListener('click', () => randomizeShips());
        shipSelectorDiv.appendChild(randomize);
    }

    function renderShipDiv() {
        let shipDiv = document.createElement('div');
        shipDiv.classList.add('ship-wrap');
        shipDiv.addEventListener('click', () => rotateShip());
        shipSelectorDiv.appendChild(shipDiv);
        return shipDiv;
    }

    function renderShip() {
        for (let i = 0; i < shipLength; i++) {
            let shipSquare = document.createElement('div');
            shipSquare.classList.add('square');
            shipSquare.classList.add('ship');
            shipSquare.classList.add('ship-selector-ship');
            shipDiv.appendChild(shipSquare);
        }
    }

    function renderRandomShip(x, y, length, vertical) {
        for (let i = 0; i < length; i++) {
            if (vertical) {
                document.getElementById(`newBoard_${x}.${y + i}`)
                    .classList.add('ship');
            }
            else {
                document.getElementById(`newBoard_${x + i}.${y}`)
                .classList.add('ship');
            }
        }
    }

    function renderClearRandomShip(x, y, length, vertical) {
        for (let i = 0; i < length; i++) {
            if (vertical) {
                document.getElementById(`newBoard_${x}.${y + i}`)
                    .classList.remove('ship');
            }
            else {
                document.getElementById(`newBoard_${x + i}.${y}`)
                .classList.remove('ship');
            }
        }
    }

    function removeShipRender() {
        let count = shipDiv.childElementCount;
        for (let i = 0; i < count; i++) {
            shipDiv.lastChild.remove();
        }
    }

    function clearShipSelector() {
        let count = shipSelectorDiv.childElementCount;
        for (let i = 0; i < count; i++) {
            shipSelectorDiv.lastChild.remove();
        }
    }

    function rotateShip() {
        if (isVertical) {
            shipDiv.classList.add('ship-selector-horizontal');
        } else {
            shipDiv.classList.remove('ship-selector-horizontal');
        }
        isVertical = !isVertical;
    }

    function addEvents() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.getElementById(`newBoard_${j}.${i}`);
                square.addEventListener('mouseover', () => hoverShip(j, i));
                square.addEventListener('mouseout', () => clearHoverShip(j, i));
                square.addEventListener('click', () => placeShip(j, i));
            }
        }
    }

    function nextShip() {
        removeShipRender();
        rotateShip();
        if (shipQueue.length === 0) {
            renderStartGame();
            return;
        }
        shipLength = shipQueue[0];
        shipQueue.shift();
        renderShip();
    }

    function hoverShip(x, y) {
        if (finishedPlacing) return;
        for (let i = 0; i < shipLength; i++) {
            let square;
            let shipClass = 'ship';
            if (isVertical) {
                if (y + shipLength - 1 > 10 || occupiedSquares[`${x}.${y + i}`] === true) shipClass = 'destroyed';
                if (y + i > 10) return;
                square = document.getElementById(`newBoard_${x}.${y + i}`);
                square.classList.add(shipClass);
            }
            else {
                if (x + shipLength - 1 > 10 || occupiedSquares[`${x + i}.${y}`] === true) shipClass = 'destroyed';
                if (x + i > 10) return;
                square = document.getElementById(`newBoard_${x + i}.${y}`);
                square.classList.add(shipClass);
            }

        }
    }

    function clearHoverShip(x, y) {
        if (finishedPlacing) return;
        for (let i = 0; i < shipLength; i++) {
            let square;
            if (isVertical) {
                if (y + i > 10) return;
                square = document.getElementById(`newBoard_${x}.${y + i}`);
                if (occupiedSquares[`${x}.${y + i}`] === true) {
                    square.classList.remove('destroyed');
                    continue;
                }
                square.classList.remove('ship');
                square.classList.remove('destroyed');
            }
            else {
                if (x + i > 10) return;
                square = document.getElementById(`newBoard_${x + i}.${y}`);
                if (occupiedSquares[`${x + i}.${y}`] === true) {
                    square.classList.remove('destroyed');
                    continue;
                }
                square.classList.remove('ship');
                square.classList.remove('destroyed');
            }

        }
    }

    function placeShip(x, y) {
        if (!canBePlaced(x, y)) return;

        ships.push({
            x: x,
            y: y,
            shipLength: shipLength,
            isVertical: isVertical
        })

        setOcupiedSquares(x, y);
        nextShip();

    }

    function canBePlaced(x, y) {
        if (finishedPlacing) return false;
        for (let i = 0; i < shipLength; i++) {
            if (isVertical) {
                if (occupiedSquares[`${x}.${y + i}`] === true) {
                    return false;
                }
            } else {
                if (occupiedSquares[`${x + i}.${y}`] === true) {
                    return false;
                }
            }
        }
        if (isVertical && (y + shipLength - 1) > 10) return false;
        if (!isVertical && (x + shipLength - 1) > 10) return false;
        return true;
    }

    function setOcupiedSquares(x, y) {
        for (let i = 0; i < shipLength; i++) {
            if (isVertical) {
                if (i === 0 && y > 1) {
                    setOccupied(x, y - 1);
                    if (x > 1) setOccupied(x - 1, y - 1);
                    if (x < 10) setOccupied(x + 1, y - 1);
                }
                if (x > 1) setOccupied(x - 1, y + i);
                if (x < 10) setOccupied(x + 1, y + i);
                if (i === (shipLength - 1) && (y + shipLength) <= 10) {
                    setOccupied(x, y + shipLength);
                    if (x > 1) setOccupied(x - 1, y + shipLength);
                    if (x < 10) setOccupied(x + 1, y + shipLength);
                }
                setOccupied(x, y + i);
            }
            else {
                if (i === 0 && x > 1) {
                    setOccupied(x - 1, y);
                    if (y > 1) setOccupied(x - 1, y - 1);
                    if (y < 10) setOccupied(x - 1, y + 1);
                }
                if (y > 1) setOccupied(x + i, y - 1);
                if (y < 10) setOccupied(x + i, y + 1);
                if (i === (shipLength - 1) && (x + shipLength) <= 10) {
                    setOccupied(x + shipLength, y);
                    if (y > 1) setOccupied(x + shipLength, y - 1);
                    if (y < 10) setOccupied(x + shipLength, y + 1);
                }
                setOccupied(x + i, y);
            }
        }
    }

    function setOccupied(x, y) {
        occupiedSquares[`${x}.${y}`] = true;
    }

    function renderStartButton() {
        let start = document.createElement('div');
        start.classList.add('start-btn');
        start.textContent = "Begin";
        start.addEventListener('click', () => startGame());
        shipSelectorDiv.appendChild(start);
    }

    function randomizeShips() {
        ships.forEach(ship => {
            renderClearRandomShip(ship.x, ship.y, ship.shipLength, ship.isVertical);
        });
        ships = randomShips();
        ships.forEach(ship => {
            renderRandomShip(ship.x, ship.y, ship.shipLength, ship.isVertical);
        });
        renderStartGame();
    }

    function renderStartGame() {
        clearShipSelector();
        renderTitle('Ready to begin!');
        renderStartButton();
        renderRandomizeButton();
        finishedPlacing = true;
    }

    function startGame() {
        game(ships);
    }

}

export { newGame }
