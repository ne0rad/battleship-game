function renderRules() {
    let game = document.getElementById('game');

    let contentHTML = 'Game Objective:' +
        '<br><br>' +
        "The object of Battleship is to try and sink all of the other player's before they sink all of your ships. All of the other player's ships are somewhere on his/her board.  You try and hit them by calling out the coordinates of one of the squares on the board.  The other player also tries to hit your ships by calling out coordinates.  Neither you nor the other player can see the other's board so you must try to guess where they are.  Each board in the physical game has two grids:  the lower (horizontal) section for the player's ships and the upper part (vertical during play) for recording the player's guesses." +
        '<br><br>' +
        'Starting a New Game:' +
        '<br><br>' +
        "Each player places the 5 ships somewhere on their board.  The ships can only be placed vertically or horizontally. Diagonal placement is not allowed. No part of a ship may hang off the edge of the board.  Ships may not overlap each other.  No ships may be placed on another ship." +
        '<br>' +
        "Once the guessing begins, the players may not move the ships." +
        '<br>' +
        "The 5 ships are:  Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).  " +
        '<br><br>' +
        'Playing the Game:' +
        '<br><br>' +
        "Player's take turns guessing by clicking on the coordinates. Game marks the board automatically, orange for hit, red for the destroyed ship." +
        '<br>' +
        "As soon as all of one player's ships have been sunk, the game ends." +
        '<br><br>';

    removePrevious();
    renderRulesDiv();
    renderContent('Game Rules', contentHTML);

    function removePrevious() {
        let count = game.childElementCount;
        for (let i = 0; i < count; i++) {
            game.lastChild.remove();
        }
        document.getElementById('display').classList.add('hidden');
    }

    function renderRulesDiv() {
        let rules = document.createElement('div');
        rules.id = 'rules';
        rules.classList.add('rules');
        game.appendChild(rules);
    }

    function renderContent(title, contentHTML) {
        let rules = document.getElementById('rules');

        let contentTitle = document.createElement('div');
        contentTitle.classList.add('about-title');
        contentTitle.textContent = title;
        rules.appendChild(contentTitle);

        let contentText = document.createElement('div');
        contentText.classList.add('about-text');
        contentText.innerHTML = contentHTML;
        rules.appendChild(contentText);
    }

}

export { renderRules }
