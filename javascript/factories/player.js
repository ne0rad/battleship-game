import { gameboard } from "./gameboard.js";
import { renderBoard } from "../DOM/renderBoard.js";

function player(playerID, ships) {
    renderBoard(playerID);
    let board = gameboard(playerID, ships);
    if (playerID === 2) addEvents();
    let clickable = true;

    function hit(x, y) {
        if (clickable) {
            if (board.hit(x, y)) {
                // if return true, then all ships are destroyed
                gameover();
            }
        }
    }

    function gameover() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.getElementById(`${playerID}_${j}.${i}`);
                square.classList.remove('clickable');
            }
        }
        clickable = false;
        console.log('Game over!');
    }

    function addEvents() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.getElementById(`${playerID}_${j}.${i}`);
                square.classList.add('clickable');
                square.addEventListener('click', () => hit(j, i));
            }
        }
    }
}

export { player }
