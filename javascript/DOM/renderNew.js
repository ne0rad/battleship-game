function renderNew() {
    let game = document.getElementById('game');

    removePrevious();
    let gameboard = renderBoard();
    renderSquares();
    renderShipSelectorDiv();

    function removePrevious() {
        let count = game.childElementCount;
        for (let i = 0; i < count; i++) {
            game.lastChild.remove();
        }
    }

    function renderBoard() {
        let gameboard = document.createElement('div');
        gameboard.id = 'newBoard';
        gameboard.classList.add('board');
        game.appendChild(gameboard);
        return gameboard;
    }

    function renderSquares() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.createElement('div');
                square.classList.add('square');
                square.id = `newBoard_${j}.${i}`;
                gameboard.appendChild(square);
            }
        }
    }

    function renderShipSelectorDiv() {
        let shipSelectorDiv = document.createElement('div');
        shipSelectorDiv.id = "shipSelector";
        shipSelectorDiv.classList.add('board');
        shipSelectorDiv.classList.add('ship-selector');
        game.appendChild(shipSelectorDiv);
    }
}

export { renderNew }
