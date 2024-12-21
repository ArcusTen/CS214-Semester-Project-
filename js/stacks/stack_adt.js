arr = [];
max = 100;
time_delay = 500;
canvas = document.querySelector('canvas');
max_width = canvas.width;
max_height = canvas.height;

stack_width = 200;
ctx = canvas.getContext("2d");
size = 10;
rect = {
    width: 60,
    height: 24
}

init();
animate();


// utility
function randomize_an_array() {
    arr = [];
    stack = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * max + 1));
    }
}

function init() {
    randomize_an_array();
    create_stack();
    document.querySelector(".stack__push").addEventListener("click", () => {
        push();
    })

    document.querySelector(".stack__pop").addEventListener("click", () => {
        pop();
    })

    document.querySelector(".stack__peek").addEventListener("click", () => {
        let val = +document.querySelector(".stack__peek__input").value;
        peek(val);
    })

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

function push() {
    if (stack.length == size) {
        alert("stack overflow");
    }
    else if (arr.length == 0) {
        alert("No Element is present to push");
        window.location.reload();
    }
    else {
        stack.push(arr.shift());
        animate();
    }
}

function pop() {
    if (stack.length == 0) {
        if (arr.length == 0) {
            alert("Empty stack can't pop further");
            window.location.reload();
        }
        else {
            alert("Empty stack,  please push something to pop")
        }
    }
    else {
        stack.splice(stack.length - 1, 1);
        animate();
    }
}

async function peek(val) {


    if (val < stack.length) {
        let i = stack.length - val - 1;
        let h = max_height - rect.height - i * (rect.height / 2) - i - 4;
        await sleep(time_delay).then(() => {
            glitter(h, stack[i], "red", "white");
        })
        await sleep(time_delay).then(() => {
            if (i == stack.length - 1) {
                glitter(h, stack[i], "lightgreen", "red");
            }
            else {
                glitter(h, stack[i]);
            }
        })
    }
    else {
        alert("Peek value should be less than the stack size")
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