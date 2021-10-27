import { renderNew } from "../DOM/renderNew.js";

function newGame() {
    renderNew();
    let shipSelectorDiv = document.getElementById('shipSelector');
    renderTitle('Place the ship on the board');
    let shipDiv = renderShipDiv();
    renderShip(5);
    renderFooter('Click on the ship to rotate');
    let isVertical = true;

    function renderTitle(text) {
        let title = document.createElement('div');
        title.classList.add('text-title');
        title.textContent = text;
        shipSelectorDiv.appendChild(title);
    }

    function renderFooter(text) {
        let footer = document.createElement('div');
        footer.classList.add('text-title');
        footer.textContent = text;
        shipSelectorDiv.appendChild(footer);
    }

    function renderShipDiv() {
        let shipDiv = document.createElement('div');
        shipDiv.classList.add('ship-wrap');
        shipDiv.addEventListener('click', () => rotateShip());
        shipSelectorDiv.appendChild(shipDiv);
        return shipDiv;
    }

    function renderShip(length) {
        for (let i = 0; i < length; i++) {
            let shipSquare = document.createElement('div');
            shipSquare.classList.add('square');
            shipSquare.classList.add('ship-selector-ship');
            shipDiv.appendChild(shipSquare);
        }
    }

    function rotateShip() {
        if(isVertical){
            shipDiv.classList.add('ship-selector-horizontal');
        } else {
            shipDiv.classList.remove('ship-selector-horizontal');
        }
        isVertical = !isVertical;
    }
}

export { newGame }
