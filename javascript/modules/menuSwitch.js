import { renderAbout } from "../DOM/renderAbout.js";
import { renderRules } from "../DOM/renderRules.js";
import { newGame } from "./newGame.js";

function menuSwitch(menu) {
    if(menu === "About") {
        renderAbout();
    } else if(menu === "Rules") {
        renderRules();
    } else if(menu === "New Game") {
        newGame();
    }
}

export { menuSwitch }
