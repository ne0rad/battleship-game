function renderAbout() {
    let game = document.getElementById('game');
    game.lastChild.remove();
    game.lastChild.remove();

    let about = document.createElement('div');
    about.classList.add('about');
    game.appendChild(about);

}

export { renderAbout }
