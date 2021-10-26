function renderAbout() {
    let game = document.getElementById('game');
    game.childNodes.forEach(node => {
        node.remove();
    });

    let about = document.createElement('div');
    about.classList.add('about');
    game.appendChild(about);

}

export { renderAbout }
