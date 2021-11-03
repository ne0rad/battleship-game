import { renderShip } from "../DOM/renderShip.js";

function ship(playerID, x, y, length, isVertical) {
    const loc = [];
    const surroundingLoc = [];
    let health = length;
    placeShip();

    function placeShip() {
        for (let i = 0; i < length; i++) {
            if (!isVertical) {
                renderShip.setShip(playerID, x + i, y);
                loc.push([x + i, y]);
                if (i === 0) {
                    surroundingLoc.push([x - 1, y]);
                    surroundingLoc.push([x - 1, y + 1]);
                    surroundingLoc.push([x - 1, y - 1]);
                }
                surroundingLoc.push([x + i, y + 1]);
                surroundingLoc.push([x + i, y - 1]);
                if (i === length - 1) {
                    surroundingLoc.push([x + length, y]);
                    surroundingLoc.push([x + length, y - 1]);
                    surroundingLoc.push([x + length, y + 1]);
                }
            }
            else {
                renderShip.setShip(playerID, x, y + i);
                loc.push([x, y + i]);
                if (i === 0) {
                    surroundingLoc.push([x, y - 1]);
                    surroundingLoc.push([x + 1, y - 1]);
                    surroundingLoc.push([x - 1, y - 1]);
                }
                surroundingLoc.push([x + 1, y + i]);
                surroundingLoc.push([x - 1, y + i]);
                if (i === length - 1) {
                    surroundingLoc.push([x, y + length]);
                    surroundingLoc.push([x - 1, y + length]);
                    surroundingLoc.push([x + 1, y + length]);
                }
            }
        }
    }

    function hit(x, y) {
        health -= 1;
        if (health === 0) {
            destroy();
            return -1;
        } else {
            renderShip.setHit(playerID, x, y);
            return 1;
        }
    }

    function destroy() {
        loc.forEach(shipLoc => {
            renderShip.setDestroyed(playerID, shipLoc[0], shipLoc[1]);
        });
    }

    function getSurroundingLoc() {
        return surroundingLoc;
    }

    return { hit, getSurroundingLoc }
}

export { ship }
