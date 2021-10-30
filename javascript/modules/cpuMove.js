function cpuMove(availableSquares) {
    const availableLoc = [];
    availableSquares.forEach(loc => {
        let tempLoc = loc.split('.');
        availableLoc.push([tempLoc[0], tempLoc[1]]);
    });
    let rand = Math.floor(Math.random() * availableLoc.length);
    return {
        x: availableLoc[rand][0],
        y: availableLoc[rand][1]
    }
}

export { cpuMove }
