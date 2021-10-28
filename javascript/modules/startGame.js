import { player } from '../factories/player.js';

function game(ships) {
    removePrevious();
    let timeout = false;
    let playerOne = player(1, ships);
    let playerTwo = player(2, ships);
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
        const availableLoc = [];
        playerOne.getAvailableLoc().forEach(loc => {
            let tempLoc = loc.split('.');
            availableLoc.push([tempLoc[0], tempLoc[1]]);
        });
        let rand = Math.floor(Math.random() * availableLoc.length);
        if (playerOne.hit(availableLoc[rand][0], availableLoc[rand][1])) {
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