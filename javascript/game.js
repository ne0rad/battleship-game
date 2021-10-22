import { renderMenu } from "./DOM/renderMenu.js";
import { renderBoard } from './DOM/renderBoard.js';
import { renderShip } from './DOM/renderShip.js';


renderMenu();
renderBoard(1); // playerID = 1
renderBoard(2); // playerID = 2

renderShip.setShip(1, 2, 5);
renderShip.setShip(1, 2, 6);
renderShip.setShip(1, 2, 7);
renderShip.setShip(1, 2, 8);


renderShip.setHit(1, 2, 1);
renderShip.setHit(1, 3, 1);
renderShip.setHit(1, 4, 1);

renderShip.setMiss(1, 7, 3);
renderShip.setMiss(1, 7, 4);
renderShip.setMiss(1, 7, 5);
renderShip.setMiss(1, 7, 6);
renderShip.setMiss(1, 6, 6);
