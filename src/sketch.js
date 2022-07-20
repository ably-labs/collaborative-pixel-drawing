const rows = 16;
const cols = rows;
const resoX = 500;
const resoY = resoX;
let sizeX;
let sizeY;
let cells = [];
let users = [];
let clientId;
let colorArray = ["#fff", "#55ffff", "#ff55ff", "#000"];

function setup() {
    frameRate(15);
    sizeX = resoX / rows;
    sizeY = resoY / cols;
    const canvas = createCanvas(resoX, resoY);
    canvas.parent("p5canvas");
    resetGrid();
}

function start() {
    clientId = getRandomInt().toString();
    select("#clientId").elt.innerText = `| You: ${clientId}`;
    const userColor = color(
        random(70, 255),
        random(70, 255),
        random(70, 255)
    ).toString("#rrggbb");
    console.log(`${clientId}-${userColor}`);
    const user = new User(clientId, userColor);
    users.push(user);
    connectAzureWebPubSub(user);
}

function draw() {
    cells.forEach(cell => {
        cell.draw();
    });
    users.forEach(user => {
        if (user.id === clientId) {
            user.update();
        }
        user.draw();
    });
}

async function changeColorPalette() {
    const paletteId =  select("#paletteSelect").elt.value;
    const response = await fetch(`/api/ChangeColorPalette/${paletteId}?hubName=${hubName}`)
    if (response.ok) {
        const colors = await response.json();
        handleChangeColorPalette(paletteId, colors);
    }
}

function handleChangeColorPalette(paletteId, colors) {
    select("#paletteSelect").elt.value = paletteId;
    colorArray = colors;
}

function resetGrid() {
    cells = [];
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const x = sizeX * col;
            const y = sizeY * row;
            cells.push(new Cell(col, row, x, y, colorArray.length - 1));
        }
    }
}

async function mouseClicked() {
    if (mouseX >= 0 && mouseX <= resoX && mouseY >= 0 && mouseY <= resoY) {
        clickCell(mouseX, mouseY);
        webSocket?.send(JSON.stringify({
            type: "sendToGroup",
            group: groupName,
            noEcho: true,
            data: {
                messageType: clickPositionMessage,
                x: mouseX,
                y: mouseY,
            }
        }));
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

function exportAsPng() {
    strokeColor = color(colorArray.length - 1);
    draw();
    const date = new Date().toISOString().split("T")[0];
    saveCanvas(`${date}-pixel-drawing`, "png");
    strokeColor = 40;
}

function reset() {
    resetGrid();
    webSocket?.send(JSON.stringify({
        type: "sendToGroup",
        group: groupName,
        noEcho: true,
        data: {
            messageType: resetMessage
        }
    }));
}

function addUser(id, color) {
    const user = users.find((user) => user.id === id);
    if (user === undefined) {
        users.push(new User(id, color));
    }

    select("#users").elt.innerText = users.length;
}

function disconnectUser() {
    users = [];
    select("#users").elt.innerText = "";
    select("#clientId").elt.innerText = "";
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
