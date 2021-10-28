import { renderMenu } from "./DOM/renderMenu.js";
import { menuSwitch } from './modules/menuSwitch.js';

function addMenuEvents() {
    document.getElementById('About')
        .addEventListener('click', () => menuSwitch('About'));
    document.getElementById('Rules')
        .addEventListener('click', () => menuSwitch('Rules'));
    document.getElementById('New Game')
        .addEventListener('click', () => menuSwitch('New Game'));
}

renderMenu();
addMenuEvents();
menuSwitch('New Game');