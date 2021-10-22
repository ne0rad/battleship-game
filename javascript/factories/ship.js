import { renderShip } from "../DOM/renderShip.js";

function ship(playerID, x, y, length, isVertical) {
    health = length;
    placeShip();

    function placeShip() {
        for (let i = 0; i < length; i++) {
            if(isVertical) renderShip.setShip(playerID, x + i, y);
            else renderShip.setShip(playerID, x, y + i);
        }
    }

    function setHit() {
        renderShip.setHit(playerID, x, y);
    }

    function setMiss() {
        renderShip.setMiss(playerID, x, y);
    }
}

export { ship }
