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
    })
    document.querySelector(".arr__delete").addEventListener("click", () => {
        delete_animation();
    })
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
    // Clear only the area where the linked list is drawn
    ctx.fillStyle = "#64e7b0";
    ctx.fillRect(0, 0, ctx.canvas.width, y + height + 10);

    ctx.save();
    ctx.fillStyle = "red";
    let black_tik = 5;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        await sleep(0).then(() => {
            count = i;
            ctx.fillRect(x + width * count + count * gap, y, width, height);
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.moveTo(x + width * count + count * gap + width, y + height / 2);
            ctx.lineTo(x + width * count + count * gap + width + gap, y + height / 2);
            ctx.lineTo(
                x + width * count + count * gap + width + gap - black_tik,
                y + height / 2 - black_tik
            );
            ctx.moveTo(x + width * count + count * gap + width + gap, y + height / 2);

            ctx.lineWidth = 3;
            ctx.fillStyle = "white";
            ctx.lineTo(
                x + width * count + count * gap + width + gap - black_tik,
                y + height / 2 + black_tik
            );
            ctx.stroke();
            ctx.fillStyle = "white";
            ctx.font = "bold 20px poppins";
            ctx.fillText(arr[i], x + width * count + count * gap + 15, y + height / 2 + 5);
            ctx.fillStyle = "red";
        });
    }
    count++;
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(x + width * count + count * gap, y, width, height);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px poppins";
    ctx.fillText("nullptr", x + width * count + count * gap + 7, y + height / 2);
    ctx.fillStyle = "#64e7b0";
    count++;
    ctx.fillRect(x + width * count + count * gap - gap, y, width, height);
    ctx.closePath();
    ctx.restore();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}