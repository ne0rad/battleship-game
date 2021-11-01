import { gameboard } from "./gameboard.js";
import { renderBoard } from "../DOM/renderBoard.js";

function player(playerID, ships) {
    renderBoard(playerID);
    let board = gameboard(playerID, ships);
    let clickable = true;

    function hit(x, y) {
        if (clickable) {
            let boardHit = board.hit(x, y);
            if (boardHit === 1) {
                return 1;
            } else if (boardHit === -1) {
                return -1;
            } else if(boardHit === 0) {
                return 0;
            } else {
                return 2;
            }
        }
    }

    function getAvailableLoc() {
        return board.getAvailableLoc();
    }

    function toggleClickable() {
        clickable = !clickable;
    }

    return { hit, getAvailableLoc, toggleClickable }
}

export { player }
