function renderAbout() {
    let game = document.getElementById('game');

    let contentHTML = 'This game is made for The Odin Project learning curriculum.' +
    '<br><br>' +
     'Technologies used:' +
     '<br>' +
     'HTML, CSS, Vanilla JavaScript, Jest(testing).' + 
     '<br><br>' +
     'GitHub Links:' +
     '<br>' +
     '<a href="https://github.com/ne0rad/battleship-game" target="_blank">Project</a>' +
     '<br>' +
     '<a href="https://github.com/ne0rad/" target="_blank">Profile (ne0rad)</a>' +
     '<br><br>';

    removePrevious();
    renderAboutDiv();
    renderContent('About', contentHTML);

    function removePrevious() {
        let count = game.childElementCount;
        for (let i = 0; i < count; i++) {
            game.lastChild.remove();
        }
    }

    function renderAboutDiv() {
        let about = document.createElement('div');
        about.id = 'about';
        about.classList.add('about');
        game.appendChild(about);
    }

    function renderContent(title, contentHTML) {
        let about = document.getElementById('about');

        let contentTitle = document.createElement('div');
        contentTitle.classList.add('about-title');
        contentTitle.textContent = title;
        about.appendChild(contentTitle);

        let contentText = document.createElement('div');
        contentText.classList.add('about-text');
        contentText.innerHTML = contentHTML;
        about.appendChild(contentText);
    }

}

export { renderAbout }
