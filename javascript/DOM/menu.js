function renderMenu() {
    renderContentDiv();
    renderMenuDiv();
    renderMenuItem('New Game');
    renderMenuItem('Rules');
    renderMenuItem('About');

    function renderContentDiv() {
        let content = document.createElement('div');
        content.id = 'content';
        document.getElementsByTagName('body')[0].appendChild(content);
    }

    function renderMenuDiv() {
        let menu = document.createElement('div');
        menu.id = 'menu';
        content.appendChild(menu);
    }

    function renderMenuItem(name) {
        let menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.textContent = name;
        menu.appendChild(menuItem);
    }
}

export { renderMenu }
