let grid = document.querySelector('.grid');
let algo = [
    {
        name: 'Queue ADT',
        link: `queue/queue_adt.html`
    },
    {
        name: 'BFS Traversal',
        link: `queue/bfs.html`
    },
]
init();

// Utility function 

function init() {
    algo.forEach((e, i) => {
        let html = `
                <a href="${e.link}" class="algo__link">${e.name}</a>
        `
        let algo = document.createElement('div');
        algo.classList.add('algo');
        algo.innerHTML = html;
        grid.appendChild(algo);
    })
}