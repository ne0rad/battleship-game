const renderShip = {
    setShip(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}${y}`);
        square.classList.add('ship');
    },

    setHit(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}${y}`);
        square.classList.add('hit');
    },

    setMiss(playerID, x, y) {
        let square = document.getElementById(`${playerID}_${x}${y}`);
        square.classList.add('miss');
    }
}

export { renderShip }
