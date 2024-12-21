let grid = document.querySelector('.grid');
let algo = [
    {
        name: 'Singly Linked List',
        link: `linked_list/singly.html`
    },
    {
        name: 'Doubly Linked List',
        link: `linked_list/doubly.html`
    },
    {
        name: 'Circular Singly Linked List',
        link: `linked_list/circular_singly.html`
    },
    {
        name: 'Circular Doubly Linked List',
        link: `linked_list/circular_doubly.html`
    },
    {
        name: 'Stack Using Linked List',
        link: `linked_list/linked_stack.html`
    },
    {
        name: 'Queue Using Linked List',
        link: `linked_list/linked_queue.html`
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