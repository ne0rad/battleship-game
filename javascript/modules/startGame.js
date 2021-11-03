import { player } from '../factories/player.js';
import { cpuMove } from './cpuMove.js';
import { randomShips } from './randomShips.js';
import { changeDisplay } from '../DOM/changeDisplay.js';

function game(ships) {
    removePrevious();
    let timeout = false;
    let playerOne = player(1, ships);
    let playerTwo = player(2, randomShips());
    addBoardEvents();
    let bestMoves = [];
    let bestFirstHit = false;
    let bestDirection = false;
    let bestLastMove = false;

    function removePrevious() {
        let gameboard = document.getElementById('game');
        let count = gameboard.childElementCount;
        for (let i = 0; i < count; i++) {
            gameboard.lastChild.remove();
        }
        document.getElementById('display').classList.remove('hidden');
        changeDisplay('Your turn!');
    }

    function hit(x, y) {
        if (!checkHit(playerTwo, x, y) || timeout) return;
        let hit = playerTwo.hit(x, y);
        if (hit === -1) {
            gameover(1);
        } else if (hit === 0) {
            cpuTimeout();
        }
    }

    function cpuTimeout() {
        timeout = true;
        changeDisplay('CPU turn');
        setTimeout(() => {
            let hit = cpuHit();
            if (!hit) {
                timeout = false;
                changeDisplay('Your turn');
            }
            else {
                cpuTimeout();
            }
        }, 500);
    }

    function cpuHit() {
        let availableHits;
        if (bestMoves.length < 1) availableHits = playerOne.getAvailableLoc();
        else availableHits = bestMoves;
        let move = cpuMove(availableHits);
        let isHit = playerOne.hit(move.x, move.y);
        if (isHit === -1) {
            gameover(2);
            return false;
        } else if (isHit === 1) {
            updateBestDirection(true, move);
            bestLastMove = move;
            updateBestMoves(true, move);
            return true;
        } else if (isHit === 0) {
            updateBestMoves(false, move);
            return false;
        } else if (isHit === 2) {
            clearBestMoves();
            return true;
        }
    }

    function updateBestMoves(isHit, move) {
        if (bestFirstHit) {
            bestMoves.splice(bestMoves.indexOf(`${move.x}.${move.y}`), 1);
            if (bestDirection && isHit) {
                bestMoves = [];
                if (bestDirection === 'right') {
                    if (!addBestMove(move.x + 1, move.y)) {
                        addBestMove(bestFirstHit.x - 1, bestFirstHit.y);
                        bestDirection = 'left';
                    }
                }
                else if (bestDirection === 'left') {
                    if (!addBestMove(move.x - 1, move.y)) {
                        addBestMove(bestFirstHit.x + 1, bestFirstHit.y);
                        bestDirection = 'right';
                    }
                }
                else if (bestDirection === 'down') {
                    if (!addBestMove(move.x, move.y + 1)) {
                        addBestMove(bestFirstHit.x, bestFirstHit.y - 1);
                        bestDirection = 'up';
                    }
                }
                else if (bestDirection === 'up') {
                    if (!addBestMove(move.x, move.y - 1)) {
                        addBestMove(bestFirstHit.x, bestFirstHit.y + 1);
                        bestDirection = 'down';
                    }
                }
            } else if (bestDirection && !isHit) {
                bestMoves = [];
                if (bestDirection === 'right') {
                    addBestMove(bestFirstHit.x - 1, bestFirstHit.y);
                    bestDirection = 'left';
                }
                else if (bestDirection === 'left') {
                    addBestMove(bestFirstHit.x + 1, bestFirstHit.y);
                    bestDirection = 'right';
                }
                else if (bestDirection === 'up') {
                    addBestMove(bestFirstHit.x, bestFirstHit.y + 1);
                    bestDirection = 'down';
                }
                else if (bestDirection === 'down') {
                    addBestMove(bestFirstHit.x, bestFirstHit.y - 1);
                    bestDirection = 'up';
                }
            }
        } else if (isHit) {
            bestFirstHit = move;
            if (move.x < 10) {
                addBestMove(move.x + 1, move.y);
            }
            if (move.x > 1) {
                addBestMove(move.x - 1, move.y)
            }
            if (move.y < 10) {
                addBestMove(move.x, move.y + 1);
            }
            if (move.y > 1) {
                addBestMove(move.x, move.y - 1);
            }
        }
        return;
    }

    function addBestMove(x, y) {
        if (checkHit(playerOne, x, y)) {
            bestMoves.push(`${x}.${y}`);
            return true;
        } else {
            return false;
        }
    }

    function updateBestDirection(isHit, move) {
        if (!bestLastMove || !isHit) return;
        if (bestLastMove.x + 1 === move.x) bestDirection = 'right';
        else if (bestLastMove.x - 1 === move.x) bestDirection = 'left';
        else if (bestLastMove.y - 1 === move.y) bestDirection = 'up';
        else if (bestLastMove.y + 1 === move.y) bestDirection = 'down';
    }

    function clearBestMoves() {
        bestMoves = [];
        bestDirection = false;
        bestFirstHit = false;
        bestLastMove = false;
        return;
    }

    function checkHit(player, x, y) {
        if (player.getAvailableLoc().indexOf(`${x}.${y}`) === -1) return false;
        else return true;
    }

    function gameover(player) {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.getElementById(`2_${j}.${i}`);
                square.classList.remove('clickable');
            }
        }
        playerOne.toggleClickable();
        playerTwo.toggleClickable();

        if(player === 1) {
            changeDisplay('You WIN!');
        } else if(player === 2) {
            setTimeout(() => changeDisplay('CPU WINS!'), 10);
        }
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