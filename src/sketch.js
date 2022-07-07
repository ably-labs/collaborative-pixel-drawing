let rows;
let cols;
const resoX = 500;
const resoY = resoX;
let sizeX;
let sizeY;
let cells = [];
let users = [];
let clientId;
let slider;
const colorArray = ["#fff", "#55ffff", "#ff55ff", "#000"];

function setup() {
    frameRate(15);
    const saveButton = createButton("Save as PNG");
    saveButton.mousePressed(saveGridAsPng);
    const clearButton = createButton("Reset");
    clearButton.mousePressed(clearGrid);
    slider = createSlider(4, 16, 8, 4);
    slider.changed(initGrid);
    initGrid();
}

function start() {
    clientId = getRandomInt().toString();
    const userColor = color(
        random(70, 255),
        random(70, 255),
        random(70, 255)
    ).toString("#rrggbb");
    console.log(`${clientId}-${userColor}`);
    const user = new User(clientId, userColor);
    users.push(user);
    connectAbly(user);
}

function initGrid() {
    rows = slider.value();
    cols = rows;
    sizeX = resoX / rows;
    sizeY = resoY / cols;
    createCanvas(resoX, resoY);
    createGrid();
}

function draw() {
    cells.forEach((cell) => {
        cell.draw();
    });
    users.forEach((user) => {
        if (user.id === clientId) {
            user.update();
        }
        user.draw();
    });
}

function createGrid() {
    cells = [];
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = sizeX * col;
            const y = sizeY * row;
            cells.push(new Cell(col, row, x, y, colorArray[colorArray.length - 1]));
        }
    }
}

async function mouseClicked() {
    if (mouseX <= resoX && mouseY <= resoY) {
        clickCell(mouseX, mouseY);
        await channel?.publish(clickPosition, {
            x: mouseX,
            y: mouseY,
        });
    }
}

function clickCell(x, y) {
    const col = floor(x / sizeX);
    const row = floor(y / sizeY);
    const selectedCell = cells[col * cols + row];
    if (selectedCell) {
        selectedCell.nextColor();
    }
}

function saveGridAsPng() {
    strokeColor = 0;
    draw();
    saveCanvas("pixel-grid", "png");
    strokeColor = 50;
}

function clearGrid() {
    createGrid();
}

function addUser(id, color) {
    const user = users.find((user) => user.id === id);
    if (user === undefined) {
        users.push(new User(id, color));
    }

    select("#users").elt.innerText = users.length;
}

function removeUser(id) {
    users.splice(
        users.findIndex((user) => user.id === id),
        1
    );
    select("#users").elt.innerText = users.length;
}

function setUserPosition(id, x, y) {
    const user = users.find((user) => user.id === id);
    if (user) {
        user.setPosition(x, y);
    }
}

function getRandomInt() {
    const min = Math.ceil(1000);
    const max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
