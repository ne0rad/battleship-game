const renderShip = {
    setShip(playerID, x, y) {
        if (playerID === 1) {
            let square = document.getElementById(`${playerID}_${x}.${y}`);
            square.classList.add('ship');
        }
    },

    setHit(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.remove('clickable');
        square.classList.remove('ship');
        square.classList.add('hit');
    },

    setDestroyed(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.remove('ship');
        square.classList.remove('hit');
        square.classList.remove('clickable');
        square.classList.add('destroyed');
    },

    setMiss(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.remove('clickable');
        square.classList.add('miss');
    },

    removeEvents() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.getElementById(`2_${j}.${i}`);
                square.removeEventListener();
            }
        }
    }
}

export { renderShip }
