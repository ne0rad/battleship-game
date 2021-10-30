import { player } from '../factories/player.js';
import { cpuMove } from './cpuMove.js';
import { randomShips } from './randomShips.js';

function game(ships) {
    removePrevious();
    let timeout = false;
    let playerOne = player(1, ships);
    let playerTwo = player(2, randomShips());
    addBoardEvents();

    function removePrevious() {
        let gameboard = document.getElementById('game');
        let count = gameboard.childElementCount;
        for (let i = 0; i < count; i++) {
            gameboard.lastChild.remove();
        }
    }

    function hit(x, y) {
        if (!checkHit(playerTwo, x, y) || timeout) return;

        if (playerTwo.hit(x, y)) {
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
        let move = cpuMove(playerOne.getAvailableLoc());
        
        if (playerOne.hit(move.x, move.y)) {
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
}

export { game }