const renderShip = {
    setShip(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.add('ship');
    },

    setHit(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.add('hit');
    },

    setDestroyed(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.add('destroyed');
    },

    setMiss(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}.${y}`);
        square.classList.add('miss');
    }
}

export { renderShip }
