function renderBoard(playerID) {
    let game = document.getElementById('game');
    let gameboard = renderGameBoard();
    renderSquares();

    function renderGameBoard() {
        let gameboard = document.createElement('div');
        gameboard.id = 'board_' + playerID;
        gameboard.classList.add('board');
        game.appendChild(gameboard);
        return gameboard;
    }

    function renderSquares() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                let square = document.createElement('div');
                square.classList.add('square');
                square.id = `${playerID}_${j}.${i}`;
                gameboard.appendChild(square);
            }
        }
    }
 }

export { renderBoard }
