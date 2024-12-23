arr = ['a', 'b', 'c', 'd', 'e', 'f'];
each = []
size = arr.length;
edge = [];
bfs_edge = [];
dimension = 30;
rel = 15;
ctx = document.querySelector("canvas").getContext("2d");
time_delay = 1000;
dx = (ctx.canvas.width - 500) / size;
dy = ctx.canvas.height / size;
ctx.save();
visited = [];
t = []
create_edges();
create_graph(edge);
init();

// Utility
function init() {
    document.querySelector(".bfs").addEventListener("click", () => {
        async function get() {
            for (let i = 0; i < size; i++) visited.push(false);
            if (visited.filter(el => el == true).length == 0) {
                await bfs(0, visited);

            }

            await create_graph(bfs_edge);

            for (let i = 0; i < t.length; i++) {
                await sleep(time_delay).then(() => {
                    createShell(i, arr[t[i]]);
                })
            }
        }
        get();
    })
    document.querySelector(".graph").addEventListener("click", () => {
        create_graph(edge);
    })
}


async function bfs(x, visited) {
    s = []
    s.push(x);
    visited[x] = true;
    while (s.length != 0) {
        x = s.shift();
        t.push(x);

        for (let j = 0; j < size; j++) {
            if (!visited[j] && edge[x][j]) {
                bfs_edge[x][j] = 1;
                bfs_edge[j][x] = 1;

                await sleep(time_delay).then(() => {
                    console.log(x, j);
                    createLine(x, j, "white");
                    createBox(x);
                    createBox(j);
                    createText(x);
                    createText(j);
                })

                s.push(j);
                visited[j] = true;

            }
        }
    }
    await sleep(time_delay).then(() => {
    })
}

async function createShell(i, val) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.roundRect(ctx.canvas.width - 200, ctx.canvas.height - (i + 1) * 80, 180, 70, 10);
    ctx.fillStyle = "white";
    ctx.fillText(val, ctx.canvas.width - 200 + 90, ctx.canvas.height - (i + 1) * 80 + 35);
    ctx.closePath();
}

function create_edges() {
    count = 0;
    for (let i = 0; i < size; i++) {
        let temp = [];
        let bfs_temp = [];
        for (let i = 0; i < size; i++) {
            temp.push(0);
            bfs_temp.push(0);
        }
        edge.push(temp);
        bfs_edge.push(bfs_temp);
    }
    for (let i = 0; i < size; i++) {
        each.push(Math.floor(Math.random() * (size - 1)) + 1)
    }
    for (let i = 0; i < size; i++) {

        for (let j = i; j < size; j++) {
            let p = Math.floor(Math.random() * 2 + 1) - 1;
            edge[i][j] = p;
            edge[j][i] = p;
            count++;
        }
    }
}

async function createLine(i, j, color = "black") {
    ctx.strokeStyle = color;
    let x = each[i] * dx + dimension / 2 + rel;
    let y = i * dy + dimension / 2 + rel;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 4;
    x = each[j] * dx + dimension / 2 + rel;
    y = j * dy + dimension / 2 + rel;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
}

async function createBox(i, color = "red") {
    ctx.fillStyle = color;
    ctx.moveTo(each[i] * dx, i * dy);
    let x = each[i] * dx + (dimension / 2) + rel;
    let y = i * dy + dimension / 2 + rel;
    ctx.beginPath();
    ctx.arc(x, y, dimension, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

async function createText(i, color = "white") {
    ctx.moveTo(each[i] * dx, i * dy);
    let x = each[i] * dx + (dimension / 2) + rel;
    let y = i * dy + dimension / 2 + rel;
    ctx.fillStyle = 'white';
    ctx.font = 'bolder 25px poppins'
    ctx.moveTo(each[i] * dx, i * dy);
    ctx.fillText(arr[i], x, y);
}


async function create_graph(edge) {
    ctx.fillStyle = "#64e7b0";
    ctx.fillRect(0, 0, ctx.canvas.width - 200, ctx.canvas.height)
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            if (+edge[i][j] == 1) {
                createLine(i, j)
            }
        }
    }
    for (let i = 0; i < size; i++) {
        createBox(i, "red");
    }

    for (let i = 0; i < size; i++) {
        createText(i, "white");
    }
    ctx.fillStyle = "#64e7b0"
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
