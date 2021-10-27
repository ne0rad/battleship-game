import { renderAbout } from "../DOM/renderAbout.js";
import { renderRules } from "../DOM/renderRules.js";

function menuSwitch(menu) {
    if(menu === "About") {
        renderAbout();
    } else if(menu === "Rules") {
        renderRules();
    }
}

export { menuSwitch }
