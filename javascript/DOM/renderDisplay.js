function renderDisplay() {

    let content = document.getElementById('content');
    renderDisplayDiv();

    function renderDisplayDiv() {
        let display = document.createElement('div');
        display.id = 'display';
        display.classList.add('display');
        display.classList.add('hidden');
        display.textContent = 'TEST 123 123';
        content.appendChild(display);
    }
}

export { renderDisplay }
