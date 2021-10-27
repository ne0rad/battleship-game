function renderMenu() {

    renderContentDiv();

    renderTitleDiv();

    renderMenuDiv();
    renderMenuItem('Rules');
    renderMenuItem('New Game');
    renderMenuItem('About');

    renderGameDiv();

    renderFooter();

    function renderContentDiv() {
        let content = document.createElement('div');
        content.id = 'content';
        document.getElementsByTagName('body')[0].appendChild(content);
    }

    function renderTitleDiv() {
        let title = document.createElement('div');
        title.id = 'title';
        title.textContent = "Battleship Game";
        content.appendChild(title);
    }

    function renderMenuDiv() {
        let menu = document.createElement('div');
        menu.id = 'menu';
        content.appendChild(menu);
    }

    function renderMenuItem(name) {
        let menuItem = document.createElement('div');
        menuItem.id = name;
        menuItem.classList.add('menu-item');
        menuItem.textContent = name;
        menu.appendChild(menuItem);
    }

    function renderGameDiv() {
        let game = document.createElement('div');
        game.id = 'game';
        content.appendChild(game);
    }

    function renderFooter() {
        let footer = document.createElement('div');
        footer.id = 'footer';
        footer.textContent = 'Made by ne0rad';
        content.appendChild(footer);
    }
}

export { renderMenu }
