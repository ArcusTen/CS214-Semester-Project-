arr = [];
max = 100;
time_delay = 1000;
canvas = document.querySelector('canvas');
max_width = canvas.width;
max_height = canvas.height;

stack_width = 200;
ctx = canvas.getContext("2d");
size = 10;
rect = {
    width: 60,
    height: 20
}

init();
animate();


// utility
function randomize_an_array() {
    arr = [];
    stack = [];
    q = Math.floor(Math.random() * (2) + 0)
    if (!q) {
        for (let i = 0; i < size; i++) {
            p = Math.floor(Math.random() * (2) + 0)
            if (p)
                arr.push('(');
            else
                arr.push(')');
        }
    }
    else {
        temp = [
            ['(', ')', '(', '(', ')', ')', '(', '(', ')', ')'],
            ['(', ')', '(', '(', ')', ')', '(', ')', '(', ')'],
            ['(', '(', ')', ')', '(', ')', '(', '(', ')', ')'],
            ['(', '(', '(', ')', ')', ')', '(', ')', '(', ')'],
            ['(', '(', '(', '(', '(', ')', ')', ')', ')', ')'],
        ]
        t = Math.floor(Math.random() * (5) + 0)
        arr = temp[t];
    }
}

function init() {
    randomize_an_array();
    create_stack();
    document.querySelector(".stack__pop").addEventListener("click", () => {
        document.querySelector(".stack__pop").disabled = true;
        visualize();
    })

}

async function visualize() {
    while (arr.length != 0) {
        if (arr[0] == '(') {
            await sleep(time_delay).then(() => {
                push();
            });
            // arr.splice(0, 1);
        }
        else {
            if (stack.length == 0) {
                alert("parantheses are not balanced");
                await sleep(time_delay).then(() => {
                    window.location.reload();
                });
                return;
            }
            if (stack[stack.length - 1] != '(') {
                alert("parantheses are not balanced");
                await sleep(time_delay).then(() => {
                    window.location.reload();
                });
                return;
            }
            await sleep(time_delay).then(() => {
                pop();
                arr.shift();
            });
        }
    }
    await sleep(time_delay).then(() => {
        alert("parantheses are balanced");
    });

    await sleep(time_delay).then(() => {
        window.location.reload();
    });
}


function create_stack() {
    ctx.fillStyle = 'black';
    ctx.fillRect(max_width - stack_width, 0, stack_width, max_height)
    ctx.fillStyle = 'white';
    ctx.fillRect(max_width - stack_width, max_height - rect.height / 2 - 3, stack_width, 1)
    ctx.font = 'bold 15px poppins'
    ctx.fillText("STACK", max_width - stack_width / 2 - 15, max_height - 1);
}


function clear(x1 = 0, y1 = 0, width = max_width, height = max_height) {
    ctx.fillStyle = '#64e7b0';
    ctx.fillRect(x1, y1, width, height)
}

function animate() {
    clear(0, 0, max_width, max_height);
    create_stack();
    arr.forEach((e, i) => {
        ctx.fillStyle = "black";
        ctx.fillRect(i * rect.width + i + 10, max_height / 2, rect.width, rect.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 15px poppins'
        ctx.fillText(`${e}`, i * rect.width + i + rect.width / 2 + 10, max_height / 2 + rect.height * (3 / 4))
        ctx.fillStyle = 'black';
    })
    stack.forEach((e, i) => {
        if (i == stack.length - 1) {
            ctx.fillStyle = "yellow";
        }
        else {
            ctx.fillStyle = "white";

        }
        let h = max_height - rect.height - i * (rect.height / 2) - i - 4;
        ctx.fillRect(max_width - stack_width + 5, h, stack_width - 10, rect.height / 2);
        ctx.fillStyle = 'red';
        ctx.font = 'bold 12px poppins'
        ctx.fillText(`${e}`, max_width - stack_width / 2, h + rect.height / 2 - 1)
        ctx.fillStyle = 'black';
    });
}

async function push() {
    if (stack.length == size) {
        // alert("stack overflow");
    }
    else if (arr.length == 0) {
        // alert("No Element is present to push");
        // window.location.reload();
    }
    else {
        stack.push(arr.shift());
        await sleep(time_delay).then(() => {
            animate();
        });
    }
}

async function pop() {
    if (stack.length == 0) {
        if (arr.length == 0) {
            // alert("Empty stack can't pop further");
            // window.location.reload();
        }
        else {
            // alert("Empty stack,  please push something to pop")
        }
    }
    else {
        stack.splice(stack.length - 1, 1);
        await sleep(time_delay).then(() => {
            animate();
        });
    }
}


function glitter(i, val, recta = "white", text = "red") {
    let h = i;
    ctx.fillStyle = recta;
    ctx.fillRect(max_width - stack_width + 5, h, stack_width - 10, rect.height / 2);
    ctx.fillStyle = text;
    ctx.font = 'bold 12px poppins'
    ctx.fillText(`${val}`, max_width - stack_width / 2, h + rect.height / 2 - 1)
    ctx.fillStyle = 'black';
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}