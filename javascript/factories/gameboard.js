import { ship } from "./ship.js";
import { renderShip } from "../DOM/renderShip.js";

function gameboard(playerID, ships) {
    let coords = {};
    let shipCount = ships.length;
    const availableLoc= [];

    setAvailableLoc();
    placeShips();

    function placeShips() {
        ships.forEach(item => {
            let newShip = ship(playerID, item.x, item.y, item.shipLength, item.isVertical);
            for (let i = 0; i < item.shipLength; i++) {
                let updatedCoordinate;
                if (!item.isVertical) {
                    updatedCoordinate = item.x + i;
                    coords[playerID + '_' + updatedCoordinate + '.' + item.y] = newShip;
                }
                else {
                    updatedCoordinate = item.y + i;
                    coords[playerID + '_' + item.x + '.' + updatedCoordinate] = newShip;
                }
            }
        });
    }

    function setAvailableLoc() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                availableLoc.push(`${j}.${i}`);
            }
        }
    }

    function getAvailableLoc() {
        return availableLoc;
    }

    function removeAvailableLoc(x, y) {
        for (let i = 0; i < availableLoc.length; i++) {
            if(availableLoc[i] === `${x}.${y}`) {
                availableLoc.splice(i, 1);
                return;
            }
        }
    }

    function hit(x, y) {
        removeAvailableLoc(x, y);
        let ship = coords[playerID + '_' + x + '.' + y];
        if (!ship) renderShip.setMiss(playerID, x, y);
        else {
            if (!ship.hit(x, y)) {
                shipCount -= 1;
                if (shipCount === 0) {
                    return true;
                }
            }

        }
        return false;
    }

    return { hit, getAvailableLoc }
}

export { gameboard }
