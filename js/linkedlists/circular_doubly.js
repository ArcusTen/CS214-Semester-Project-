let arr = []
let size = 9;
time_delay = 1000;
let max = 100;
let ctx = document.querySelector("#canvas").getContext("2d");
ll = ['head']
let pos = -1;
init();


// Utility
function randomize_an_array() {
    arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * max + 1));
    }
}

function init() {
    randomize_an_array();
    create_array();
    add_listeners();
    createSinglyLinkedList(ll);
}

function create_array() {
    pw = ctx.canvas.width / size;
    height = 50;
    for (let i = 0; i < size; i++) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        if (i == pos) ctx.fillStyle = "gray";
        ctx.fillRect(i * pw, ctx.canvas.height - height, pw, height)

        ctx.strokeStyle = "white";
        ctx.strokeRect(i * pw, ctx.canvas.height - height, pw, height)

        ctx.fillStyle = "white";
        ctx.lineWidth = 1
        ctx.font = "bolder 15px poppins"
        ctx.fillText(arr[i], i * pw + pw / 2, ctx.canvas.height - height + height / 2)
        ctx.closePath();
        ctx.fillStyle = "black";

    }
}


function add_listeners() {
    document.querySelector(".arr__insert").addEventListener("click", () => {
        insert_animation();
    });
    document.querySelector(".arr__delete").addEventListener("click", () => {
        delete_animation();
    });
    document.querySelector(".arr__remove-middle").addEventListener("click", () => {
        remove_middle_animation();
    });
}

function remove_middle_animation() {
    if (ll.length <= 2) {
        alert("No middle elements to remove. The list must have at least 3 elements.");
        return;
    }

    // Calculate the middle index
    const middleIndex = Math.floor((ll.length - 1) / 2);

    // Remove the middle element
    ll.splice(middleIndex, 1);

    // Update the visualization
    create_array(); // Redraw the array visualization
    createSinglyLinkedList(ll); // Redraw the linked list
}


function insert_animation() {
    pos++;
    if (pos >= size) {
        alert("No Element is present to be inserted");
        return;
    }
    else {
        ll.push(arr[pos]);
    }
    create_array();
    createSinglyLinkedList(ll);
}

function delete_animation() {
    if (ll.length == 1) {
        alert("Linked List has not Element present to be deleted");
    }
    else {
        ll.splice(1, 1);
        createSinglyLinkedList(ll);
    }
}

async function createSinglyLinkedList(arr, width = 70, height = 40, x = 20, y = 100, gap = 20, is_circular = false) {
    ctx.fillStyle = "#64e7b0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height - 150);
    black_tik = 5;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        await sleep(0).then(() => {
            count = i;
            ctx.fillStyle = 'red';

            ctx.fillRect(x + width * count + count * gap, y, width, height);
            ctx.beginPath();

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            if (i != arr.length - 1) {
                ctx.moveTo(x + width * count + count * gap + width, y + height / 2);

                //up tick
                ctx.lineTo(x + width * count + count * gap + width + black_tik, y + height / 2 + black_tik);
                ctx.moveTo(x + width * count + count * gap + width, y + height / 2);

                //Down tick
                ctx.lineTo(x + width * count + count * gap + width + black_tik, y + height / 2 - black_tik);
                ctx.moveTo(x + width * count + count * gap + width, y + height / 2);
                ctx.lineTo(x + width * count + count * gap + width + gap, y + height / 2);
                ctx.lineTo(x + width * count + count * gap + width + gap - black_tik, y + height / 2 - black_tik);
                ctx.moveTo(x + width * count + count * gap + width + gap, y + height / 2);
                ctx.moveTo(x + width * count + count * gap + width, y + height / 2);
                ctx.lineTo(x + width * count + count * gap + width + gap, y + height / 2);
                ctx.lineTo(x + width * count + count * gap + width + gap - black_tik, y + height / 2 - black_tik);
                ctx.moveTo(x + width * count + count * gap + width + gap, y + height / 2);
                ctx.lineWidth = 3
                ctx.fillStyle = "white";
                ctx.lineTo(x + width * count + count * gap + width + gap - black_tik, y + height / 2 + black_tik);
                ctx.stroke();
            }

            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px poppins';
            ctx.fillText(arr[i], x + width * count + count * gap + 15, y + height / 2 + 5)
            ctx.fillStyle = 'red';
        })
    }
    // circular  link
    ctx.strokeStyle = 'blue';
    ctx.moveTo(x + width * count + count * gap + width, y + height / 2);

    //up tick
    ctx.lineTo(x + width * count + count * gap + width + black_tik, y + height / 2 + black_tik);
    ctx.moveTo(x + width * count + count * gap + width, y + height / 2);

    //Down tick
    ctx.lineTo(x + width * count + count * gap + width + black_tik, y + height / 2 - black_tik);

    ctx.moveTo(x + width * count + count * gap + width, y + height / 2);
    ctx.moveTo(x + width * count + count * gap + width, y + height / 2);
    ctx.lineTo(x + width * (.5 + count) + (.5 + count) * gap + width, y + height / 2);
    ctx.lineTo(x + width * (.5 + count) + (.5 + count) * gap + width, y + height / 2 + 2 * height);
    ctx.lineTo(x + width * (0) + (0) * gap + width - 50, y + height / 2 + 2 * height);
    ctx.lineTo(x + width * (0) + (0) * gap + width - 50, y + height);
    ctx.lineTo(x + width * (0) + (0) * gap + width - 50 + black_tik, y + height + black_tik)

    ctx.lineTo(x + width * (0) + (0) * gap + width - 50, y + height);
    ctx.lineTo(x + width * (0) + (0) * gap + width - 50 - black_tik, y + height + black_tik)

    ctx.stroke();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
