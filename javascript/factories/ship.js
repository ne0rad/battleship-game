import { renderShip } from "../DOM/renderShip.js";

function ship(playerID, x, y, length, isVertical) {
    const loc = [];
    let health = length;
    placeShip();

    function placeShip() {
        for (let i = 0; i < length; i++) {
            if (isVertical) {
                renderShip.setShip(playerID, x + i, y);
                loc.push([x + i, y]);
            }
            else {
                renderShip.setShip(playerID, x, y + i);
                loc.push([x, y + i]);
            }
        }
    }

    function hit(x, y) {
        health -= 1;
        if (health === 0) {
            destroy();
            return false;
        } else {
            renderShip.setHit(playerID, x, y);
            return true;
        }
    }

    function destroy() {
        loc.forEach(shipLoc => {
            renderShip.setDestroyed(playerID, shipLoc[0], shipLoc[1]);
        });
    }

    function getLoc() {
        return loc;
    }

    return { getLoc, hit }
}

export { ship }
