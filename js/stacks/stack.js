
let grid = document.querySelector('.grid');
let algo = [
    {
        name: 'Stack ADT',
        link: `stack/stack_adt.html`
    },
    {
        name: 'Balanced Bracket',
        link: `stack/balanced_bracket.html`
    },
]
init();

// Utility function 

function init() {
    algo.forEach((e, i) => {
        let html = `<a href="${e.link}" class="algo__link">${e.name}</a>`;
        let algo = document.createElement('div');
        algo.classList.add('algo');
        algo.innerHTML = html;
        grid.appendChild(algo);
    })
}