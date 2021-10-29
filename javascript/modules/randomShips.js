function randomShips() {
    const ships = [];
    let occupiedSquares = {};
    const shipQueue = [5, 4, 3, 3, 2];
    let isVertical;
    let shipLength;
    nextShip();

    function nextShip() {
        if (shipQueue.length === 0) {
            return;
        }
        shipLength = shipQueue[0];
        placeShip();
    }

    function rngShip() {
        let rngVertical = Math.floor(Math.random() * 2);
        let rngX = Math.floor(Math.random() * 10) + 1;
        let rngY = Math.floor(Math.random() * 10) + 1;

        return {
            isVertical: rngVertical === 0 ? true : false,
            x: rngX,
            y: rngY
        }
    }

    function tryToPlaceShip() {
        shipLength = shipQueue[0];
        let ship = rngShip();
        let x = ship.x;
        let y = ship.y;
        isVertical = ship.isVertical;

        if (isVertical && y + shipLength - 1 >= 10) return false;
        if (!isVertical && x + shipLength - 1 >= 10) return false;

        for (let i = 0; i < shipLength; i++) {
            if (isVertical) {
                if (occupiedSquares[`${x}.${y + i}`] === true) return false;
            } else {
                if (occupiedSquares[`${x + i}.${y}`] === true) return false;
            }
        }
        return {
            x: x,
            y: y
        };
    }

    function placeShip() {
        let ship = tryToPlaceShip();
        if (ship) {
            setOcupiedSquares(ship.x, ship.y);
            ships.push({
                x: ship.x,
                y: ship.y,
                shipLength: shipLength,
                isVertical: isVertical
            });
            shipQueue.shift();
            nextShip();
        } else {
            placeShip();
        }
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

    return ships;
}

export { randomShips }
