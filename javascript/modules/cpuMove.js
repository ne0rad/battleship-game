function cpuMove(availableSquares) {
    const availableLoc = [];
    availableSquares.forEach(loc => {
        let tempLoc = loc.split('.');
        availableLoc.push([tempLoc[0], tempLoc[1]]);
    });
    let rand = Math.floor(Math.random() * availableLoc.length);
    return {
        x: parseInt(availableLoc[rand][0]),
        y: parseInt(availableLoc[rand][1])
    }
}

export { cpuMove }
