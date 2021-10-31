import { player } from '../factories/player.js';
import { cpuMove } from './cpuMove.js';
import { randomShips } from './randomShips.js';

function game(ships) {
    removePrevious();
    let timeout = false;
    let playerOne = player(1, ships);
    let playerTwo = player(2, randomShips());
    addBoardEvents();
    const bestMoves = [];

    function removePrevious() {
        let gameboard = document.getElementById('game');
        let count = gameboard.childElementCount;
        for (let i = 0; i < count; i++) {
            gameboard.lastChild.remove();
        }
    }

    function hit(x, y) {
        if (!checkHit(playerTwo, x, y) || timeout) return;

        if (playerTwo.hit(x, y) === -1) {
            gameover();
        } else {
            timeout = true;
            setTimeout(() => {
                cpuHit();
                timeout = false;
            }, 500);
        }
    }

    function cpuHit() {
        let availableHits;
        if (bestMoves.length <= 0) availableHits = playerOne.getAvailableLoc();
        else availableHits = bestMoves;
        let move = cpuMove(availableHits);
        let isHit = playerOne.hit(move.x, move.y);
        if (isHit === -1) {
            gameover();
        } else if(isHit === 1) {
            updateBestMoves(true, {x: move.x, y: move.y});
        } else if(isHit === 0) {
            updateBestMoves(false, {x: move.x, y: move.y});
        }
    }

    function updateBestMoves(isHit, move) {
        // TODO
        return
    }

    function clearBestMoves() {
        // TODO
        return
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
}

export { game }